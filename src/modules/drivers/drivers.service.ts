import {
  Injectable, NotFoundException, BadRequestException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TrackingGateway } from '../tracking/tracking.gateway';

@Injectable()
export class DriversService {
  constructor(
    @InjectDataSource() private readonly db: DataSource,
    private readonly trackingGateway: TrackingGateway,
  ) {}

  // ─── تحديث الموقع الجغرافي ─────────────────────────────────────────────────
  async updateLocation(driverId: string, lat: number, lng: number) {
    // التحقق من صحة الإحداثيات
    if (lat < -90 || lat > 90)   throw new BadRequestException('خط العرض (lat) يجب أن يكون بين -90 و 90');
    if (lng < -180 || lng > 180) throw new BadRequestException('خط الطول (lng) يجب أن يكون بين -180 و 180');

    const [driver] = await this.db.query(
      `UPDATE drivers
       SET
         location     = ST_SetSRID(ST_MakePoint($3, $2), 4326)::geography,
         lat          = $2,
         lng          = $3,
         last_seen_at = NOW(),
         updated_at   = NOW()
       WHERE user_id = $1
       RETURNING id, lat, lng, is_online, last_seen_at`,
      [driverId, lat, lng],
    );

    if (!driver) throw new NotFoundException('السائق غير موجود');

    // 📡 بث الموقع المحدث عبر WebSockets
    this.trackingGateway.broadcastDriverLocation({
      driverId,
      lat,
      lng,
    });

    return driver;
  }

  // ─── تغيير حالة الاتصال ────────────────────────────────────────────────────
  async toggleOnlineStatus(driverId: string, isOnline: boolean) {
    const [driver] = await this.db.query(
      `UPDATE drivers
       SET is_online  = $2,
           updated_at = NOW()
       WHERE user_id = $1
       RETURNING id, is_online, lat, lng`,
      [driverId, isOnline],
    );

    if (!driver) throw new NotFoundException('السائق غير موجود');
    return {
      ...driver,
      message: isOnline ? 'أنت الآن متصل وجاهز لاستقبال الطلبات' : 'أنت الآن غير متصل',
    };
  }

  // ─── الملف الشخصي ──────────────────────────────────────────────────────────
  async getDriverProfile(userId: string) {
    const [profile] = await this.db.query(
      `SELECT
         d.id             AS driver_id,
         d.vehicle_plate,
         d.is_online,
         d.is_verified,
         d.current_rating,
         d.total_orders,
         d.lat, d.lng,
         d.last_seen_at,
         u.name,
         u.phone,
         u.email,
         u.created_at     AS member_since
       FROM drivers d
       JOIN users u ON u.id = d.user_id
       WHERE d.user_id = $1`,
      [userId],
    );

    if (!profile) throw new NotFoundException('السائق غير موجود');
    return profile;
  }

  // ─── سجل طلبات السائق ──────────────────────────────────────────────────────
  async getDriverOrders(driverId: string) {
    return this.db.query(
      `SELECT
         o.id, o.pickup_address, o.dropoff_address,
         o.total_price, o.distance_km, o.status,
         o.accepted_at, o.delivered_at, o.created_at,
         u.name AS client_name, u.phone AS client_phone
       FROM orders o
       JOIN users u ON u.id = o.client_id
       WHERE o.driver_id = $1
       ORDER BY o.created_at DESC
       LIMIT 20`,
      [driverId],
    );
  }
}
