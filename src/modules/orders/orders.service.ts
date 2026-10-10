import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PricingService } from './pricing.service';
import { NotificationsService } from '../notifications/notifications.service';
import { TrackingGateway } from '../tracking/tracking.gateway';
import { WalletService } from '../wallet/wallet.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  private readonly MAX_DISTANCE_KM = parseFloat(
    process.env.MAX_ORDER_DISTANCE_KM ?? '100',
  );
  private readonly NOTIFY_RADIUS_KM = parseFloat(
    process.env.MAX_ORDER_RADIUS_KM ?? '5',
  );

  constructor(
    @InjectDataSource() private readonly db: DataSource,
    private readonly pricingService: PricingService,
    private readonly notificationsService: NotificationsService,
    private readonly trackingGateway: TrackingGateway,
    private readonly walletService: WalletService,
  ) {}

  // ─── إنشاء طلب ────────────────────────────────────────────────────────────
  async createOrder(clientId: string, dto: CreateOrderDto) {
    // 1. حساب مسافة الطريق الحقيقية (Road Distance)
    const distanceKm = await this.pricingService.calculateRoadDistanceKm(
      dto.pickup_lat, dto.pickup_lng,
      dto.dropoff_lat, dto.dropoff_lng,
    );

    if (distanceKm < 0.1) {
      throw new BadRequestException('المسافة قصيرة جداً (أقل من 100 متر)');
    }
    if (distanceKm > this.MAX_DISTANCE_KM) {
      throw new BadRequestException(
        `المسافة تتجاوز الحد المسموح (${this.MAX_DISTANCE_KM} كم)`,
      );
    }

    // 2. حساب السعر ديناميكياً من الإعدادات + كود الخصم إن وُجد
    const pricing = await this.pricingService.calculatePrice(distanceKm, dto.promo_code);

    // 3. إنشاء الطلب مع PostGIS geography points
    const [order] = await this.db.query(
      `INSERT INTO orders (
         client_id,
         pickup_address,
         pickup_location,
         pickup_lat, pickup_lng,
         dropoff_address,
         dropoff_location,
         dropoff_lat, dropoff_lng,
         distance_km,
         base_price, price_per_km, total_price,
         promo_code, discount_amount,
         notes
       ) VALUES (
         $1,
         $2,
         ST_SetSRID(ST_MakePoint($4, $3), 4326)::geography,
         $3, $4,
         $5,
         ST_SetSRID(ST_MakePoint($7, $6), 4326)::geography,
         $6, $7,
         $8,
         $9, $10, $11,
         $12, $13,
         $14
       )
       RETURNING
         id, pickup_address, pickup_lat, pickup_lng,
         dropoff_address, dropoff_lat, dropoff_lng,
         distance_km, base_price, price_per_km, total_price,
         promo_code, discount_amount,
         status, notes, created_at`,
      [
        clientId,
        dto.pickup_address,  dto.pickup_lat,  dto.pickup_lng,
        dto.dropoff_address, dto.dropoff_lat, dto.dropoff_lng,
        distanceKm,
        pricing.baseFee, pricing.perKmRate, pricing.totalPrice,
        pricing.appliedPromo ?? null, pricing.discountAmount,
        dto.notes ?? null,
      ],
    );

    // تحديث عدد مرات استخدام كود الخصم
    if (pricing.appliedPromo) {
      await this.db.query(
        `UPDATE promo_codes SET used_count = used_count + 1 WHERE code = $1`,
        [pricing.appliedPromo],
      );
    }

    // 4. إشعار السائقين القريبين (background — لا ينتظر)
    this.notifyNearbyDrivers(order).catch((err) =>
      console.error('FCM notify error:', err),
    );

    // 📡 بث فوري عبر WebSockets لجميع السائقين المتصلين
    this.trackingGateway.broadcastNewPendingOrder(order);

    return order;
  }

  // ─── الطلبات القريبة من السائق (PostGIS ST_DWithin) ──────────────────────
  async getNearbyOrders(driverId: string, radiusKm = 5) {
    const [driver] = await this.db.query(
      `SELECT location, is_online FROM drivers WHERE user_id = $1`,
      [driverId],
    );

    if (!driver) throw new NotFoundException('السائق غير موجود');
    if (!driver.is_online) {
      throw new ForbiddenException('يجب أن تكون في حالة "متصل" لرؤية الطلبات');
    }
    if (!driver.location) {
      throw new BadRequestException('لم يتم تحديد موقعك، حدّث الموقع أولاً');
    }

    // ✅ PostGIS ST_DWithin يستخدم الـ GIST Index تلقائياً
    return this.db.query(
      `SELECT
         o.id,
         o.pickup_address,
         o.dropoff_address,
         o.pickup_lat,
         o.pickup_lng,
         o.dropoff_lat,
         o.dropoff_lng,
         o.total_price,
         o.distance_km,
         o.status,
         o.notes,
         o.created_at,
         ROUND(
           (ST_Distance(d.location, o.pickup_location) / 1000.0)::numeric, 2
         ) AS distance_to_pickup_km
       FROM orders o
       CROSS JOIN drivers d
       WHERE d.user_id = $1
         AND o.status = 'pending'
         AND ST_DWithin(
               d.location,
               o.pickup_location,
               $2 * 1000
             )
       ORDER BY distance_to_pickup_km ASC
       LIMIT 50`,
      [driverId, radiusKm],
    );
  }

  // ─── قبول الطلب مع منع Race Condition ────────────────────────────────────
  async acceptOrder(driverId: string, orderId: string) {
    const queryRunner = this.db.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');

    try {
      // ✅ SELECT FOR UPDATE SKIP LOCKED
      // إذا كان الصف مقفولاً من سائق آخر، SKIP LOCKED ترجع مجموعة فارغة فوراً
      const [order] = await queryRunner.query(
        `SELECT id, status, client_id
         FROM orders
         WHERE id = $1
         FOR UPDATE SKIP LOCKED`,
        [orderId],
      );

      if (!order) {
        throw new ConflictException(
          'الطلب قيد المعالجة من سائق آخر، حاول مع طلب آخر',
        );
      }
      if (order.status !== 'pending') {
        throw new ConflictException(
          `لا يمكن قبول الطلب — الحالة الحالية: "${order.status}"`,
        );
      }

      // التحقق أن السائق متصل
      const [driver] = await queryRunner.query(
        `SELECT id, is_online FROM drivers WHERE user_id = $1`,
        [driverId],
      );
      if (!driver?.is_online) {
        throw new ForbiddenException(
          'يجب أن تكون في حالة "متصل" لقبول الطلبات',
        );
      }

      // 💳 التحقق من أهلية السائق (التوثيق KYC + عدم تجاوز سقف الديون)
      await this.walletService.assertDriverCanAcceptOrders(driverId);

      // تحديث الطلب
      const [updated] = await queryRunner.query(
        `UPDATE orders
         SET driver_id   = $1,
             status      = 'accepted',
             accepted_at = NOW(),
             updated_at  = NOW()
         WHERE id = $2
         RETURNING *`,
        [driverId, orderId],
      );

      await queryRunner.commitTransaction();

      // 📡 بث فوري لحالة الطلب عبر WebSockets للعميل والسائق
      this.trackingGateway.broadcastOrderStatus(orderId, 'accepted', { driverId });

      // إشعار العميل (background)
      this.notifyClientOrderAccepted(order.client_id, updated).catch(
        (err) => console.error('FCM client notify error:', err),
      );

      return updated;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // ─── تحديث حالة الطلب ────────────────────────────────────────────────────
  async updateOrderStatus(
    driverId: string,
    orderId: string,
    newStatus: 'picked_up' | 'in_transit' | 'delivered' | 'cancelled',
  ) {
    const validTransitions: Record<string, string[]> = {
      accepted:   ['picked_up', 'cancelled'],
      picked_up:  ['in_transit'],
      in_transit: ['delivered'],
    };

    const [order] = await this.db.query(
      `SELECT id, status, driver_id, client_id, total_price FROM orders WHERE id = $1`,
      [orderId],
    );

    if (!order) throw new NotFoundException('الطلب غير موجود');
    if (order.driver_id !== driverId) {
      throw new ForbiddenException('لا يمكنك تعديل طلب لم تقبله');
    }

    const allowed = validTransitions[order.status] ?? [];
    if (!allowed.includes(newStatus)) {
      throw new BadRequestException(
        `الانتقال من "${order.status}" إلى "${newStatus}" غير مسموح`,
      );
    }

    const timestampMap: Record<string, string> = {
      picked_up:  'picked_up_at',
      delivered:  'delivered_at',
      cancelled:  'cancelled_at',
    };
    const tsCol = timestampMap[newStatus] ?? 'updated_at';

    const [updated] = await this.db.query(
      `UPDATE orders
       SET status     = $1,
           ${tsCol}   = NOW(),
           updated_at = NOW()
       WHERE id = $2
       RETURNING id, status, ${tsCol}, updated_at`,
      [newStatus, orderId],
    );

    // 💵 خصم عمولة المنصة التلقائي (15%) عند إتمام التوصيل
    if (newStatus === 'delivered') {
      await this.walletService.deductOrderCommission(
        orderId,
        driverId,
        parseFloat(order.total_price),
      );
    }

    // 📡 بث فوري للتحديث لغرفة الطلب
    this.trackingGateway.broadcastOrderStatus(orderId, newStatus);

    // 🔔 إرسال إشعار فوري للعميل بالتحديث
    await this.notifyClientOrderStatus(order.client_id, orderId, newStatus);

    return updated;
  }

  // ─── طلبات العميل ─────────────────────────────────────────────────────────
  async getClientOrders(clientId: string) {
    return this.db.query(
      `SELECT
         o.id, o.pickup_address, o.dropoff_address,
         o.total_price, o.distance_km, o.status,
         o.created_at, o.accepted_at, o.delivered_at,
         u.name AS driver_name, u.phone AS driver_phone
       FROM orders o
       LEFT JOIN users u ON u.id = o.driver_id
       WHERE o.client_id = $1
       ORDER BY o.created_at DESC
       LIMIT 20`,
      [clientId],
    );
  }

  // ─── Private Helpers ───────────────────────────────────────────────────────
  private async notifyNearbyDrivers(order: any): Promise<void> {
    const drivers = await this.db.query(
      `SELECT u.fcm_token
       FROM drivers d
       JOIN users u ON u.id = d.user_id
       WHERE d.is_online = TRUE
         AND u.fcm_token IS NOT NULL
         AND ST_DWithin(
               d.location,
               ST_SetSRID(ST_MakePoint($2, $1), 4326)::geography,
               $3 * 1000
             )`,
      [order.pickup_lat, order.pickup_lng, this.NOTIFY_RADIUS_KM],
    );

    const tokens: string[] = drivers.map((d: any) => d.fcm_token);
    if (tokens.length === 0) return;

    await this.notificationsService.sendMulticast(tokens, {
      title: '🏍️ طلب توصيل جديد!',
      body:  `من: ${order.pickup_address} — ${order.total_price} دج`,
      data:  { order_id: order.id, type: 'NEW_ORDER' },
    });
  }

  private async notifyClientOrderAccepted(
    clientId: string,
    order: any,
  ): Promise<void> {
    const [user] = await this.db.query(
      `SELECT fcm_token FROM users WHERE id = $1 AND fcm_token IS NOT NULL`,
      [clientId],
    );
    if (!user?.fcm_token) return;

    await this.notificationsService.sendOne(user.fcm_token, {
      title: '✅ تم قبول طلبك!',
      body:  'السائق في طريقه إليك الآن بالدراجة النارية',
      data:  { order_id: order.id, type: 'ORDER_ACCEPTED' },
    });
  }

  private async notifyClientOrderStatus(
    clientId: string,
    orderId: string,
    status: string,
  ): Promise<void> {
    const [user] = await this.db.query(
      `SELECT fcm_token FROM users WHERE id = $1 AND fcm_token IS NOT NULL`,
      [clientId],
    );
    if (!user?.fcm_token) return;

    const titles: Record<string, string> = {
      picked_up: '📦 تم استلام الطرد بنجاح!',
      in_transit: '🛵 السائق متوجه نحو نقطة التسليم',
      delivered: '🎉 وصل طلبك! تم التوصيل بنجاح',
      cancelled: '❌ تم إلغاء الطلب',
    };

    const title = titles[status] || `تحديث للطلب: ${status}`;
    await this.notificationsService.sendOne(user.fcm_token, {
      title,
      body: `الطلب #${orderId.slice(0, 8)}: ${title}`,
      data: { order_id: orderId, type: 'STATUS_UPDATE', status },
    });
  }
}
