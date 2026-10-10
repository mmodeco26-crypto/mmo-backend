import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource() private readonly db: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  // ─── تسجيل مستخدم جديد ────────────────────────────────────────────────────
  async register(dto: RegisterDto) {
    // 1. التحقق من عدم تكرار رقم الهاتف
    const existing = await this.db.query(
      `SELECT id FROM users WHERE phone = $1`,
      [dto.phone],
    );
    if (existing.length > 0) {
      throw new ConflictException('رقم الهاتف مسجل مسبقاً');
    }

    // 2. تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(dto.password, 12);

    // 3. Transaction لإنشاء المستخدم + السائق في آنٍ واحد
    const queryRunner = this.db.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const [user] = await queryRunner.query(
        `INSERT INTO users (name, phone, email, password, role, fcm_token)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, name, phone, role`,
        [
          dto.name,
          dto.phone,
          dto.email ?? null,
          hashedPassword,
          dto.role ?? 'client',
          dto.fcm_token ?? null,
        ],
      );

      // إنشاء سجل السائق إن كان الدور driver
      if (dto.role === 'driver') {
        if (!dto.vehicle_plate) {
          throw new BadRequestException('رقم لوحة السيارة مطلوب للسائقين');
        }
        await queryRunner.query(
          `INSERT INTO drivers (user_id, vehicle_plate)
           VALUES ($1, $2)`,
          [user.id, dto.vehicle_plate],
        );
      }

      await queryRunner.commitTransaction();

      const token = this._signToken(user);
      return { user, access_token: token };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // ─── تسجيل الدخول ─────────────────────────────────────────────────────────
  async login(dto: LoginDto) {
    const rawIdentifier = (dto.phone || '').trim().toLowerCase();

    let user;
    if (rawIdentifier === 'admin') {
      const [adminUser] = await this.db.query(
        `SELECT id, name, phone, password, role, is_active
         FROM users WHERE role = 'admin'
         ORDER BY created_at ASC LIMIT 1`,
      );
      user = adminUser;
    } else if (rawIdentifier === 'agent') {
      const [agentUser] = await this.db.query(
        `SELECT id, name, phone, password, role, is_active
         FROM users WHERE role = 'agent'
         ORDER BY created_at ASC LIMIT 1`,
      );
      user = agentUser;
    } else {
      const [found] = await this.db.query(
        `SELECT id, name, phone, password, role, is_active
         FROM users WHERE phone = $1`,
        [dto.phone.trim()],
      );
      user = found;
    }

    if (!user) {
      throw new UnauthorizedException('رقم الهاتف أو كلمة المرور غير صحيحة');
    }
    if (!user.is_active) {
      throw new UnauthorizedException('هذا الحساب معطّل، تواصل مع الدعم');
    }

    // التحقق الأمني الصارم: مطابقة كلمة المرور المشفرة فقط عبر bcrypt
    const isValid = await bcrypt.compare(dto.password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('رقم الهاتف أو كلمة المرور غير صحيحة');
    }

    const token = this._signToken(user);
    const { password: _pass, ...safeUser } = user;
    return { user: safeUser, access_token: token };
  }

  // ─── تحديث FCM Token ───────────────────────────────────────────────────────
  async updateFcmToken(userId: string, fcmToken: string) {
    await this.db.query(
      `UPDATE users SET fcm_token = $1 WHERE id = $2`,
      [fcmToken, userId],
    );
    return { message: 'تم تحديث رمز الإشعارات' };
  }

  // ─── محاكي الفحص المباشر (Simulator Helpers) ──────────────────────────────
  /**
   * جلب قائمة جميع السائقين الحقيقيين المسجلين في المنصة لاستخدامهم في المحاكي
   */
  async getSimulatorDrivers() {
    return this.db.query(
      `SELECT d.id AS driver_id, d.user_id, u.name, u.phone, d.vehicle_plate,
              d.is_online, d.is_verified, d.kyc_status, d.current_rating,
              COALESCE(w.balance, 0.00) AS wallet_balance,
              COALESCE(w.debt_limit, 3000.00) AS debt_limit,
              COALESCE(d.lat, 36.7538) AS lat,
              COALESCE(d.lng, 3.0588) AS lng
       FROM drivers d
       JOIN users u ON u.id = d.user_id
       LEFT JOIN wallets w ON w.user_id = d.user_id
       WHERE u.is_active = TRUE
       ORDER BY d.created_at DESC`,
    );
  }

  /**
   * توليد JWT Token حقيقي لأي سائق مسجل اختاره المستخدم لتجربة المحاكي به
   */
  async getSimulatorDriverToken(driverId: string) {
    const [driver] = await this.db.query(
      `SELECT d.id AS driver_id, d.user_id, u.name, u.phone, u.role, d.vehicle_plate,
              d.kyc_status, d.is_verified,
              COALESCE(w.balance, 0.00) AS wallet_balance
       FROM drivers d
       JOIN users u ON u.id = d.user_id
       LEFT JOIN wallets w ON w.user_id = d.user_id
       WHERE (d.id = $1 OR d.user_id = $1) AND u.is_active = TRUE`,
      [driverId],
    );

    if (!driver) {
      throw new NotFoundException('السائق المختار غير موجود أو حسابه غير نشط');
    }

    // تفعيل السائق وضمان وجود موقع جغرافي ليكون مؤهلاً لاستقبال وقبول الطلبات
    await this.db.query(
      `UPDATE drivers 
       SET is_online = TRUE,
           location = COALESCE(location, ST_SetSRID(ST_MakePoint(3.0588, 36.7538), 4326)::geography),
           lat = COALESCE(lat, 36.7538),
           lng = COALESCE(lng, 3.0588),
           last_seen_at = NOW()
       WHERE user_id = $1`,
      [driver.user_id],
    );

    // ضمان وجود محفظة مالية للسائق
    await this.db.query(
      `INSERT INTO wallets (user_id, balance, debt_limit, currency)
       VALUES ($1, 0.00, 3000.00, 'DZD')
       ON CONFLICT (user_id) DO NOTHING`,
      [driver.user_id],
    );

    const token = this._signToken({
      id: driver.user_id,
      role: 'driver',
      phone: driver.phone,
    });

    return {
      driver,
      access_token: token,
    };
  }

  /**
   * توليد JWT Token حقيقي لزبون حقيقي لإرسال الطلبات في المحاكي
   */
  async getSimulatorClientToken() {
    let [client] = await this.db.query(
      `SELECT id, name, phone, role FROM users WHERE role = 'client' AND is_active = TRUE ORDER BY created_at DESC LIMIT 1`,
    );

    if (!client) {
      const hashedPassword = await bcrypt.hash('Client123!', 10);
      [client] = await this.db.query(
        `INSERT INTO users (name, phone, password, role, is_active)
         VALUES ('زبون تجريبي (Client)', '0550000001', $1, 'client', TRUE)
         RETURNING id, name, phone, role`,
        [hashedPassword],
      );
    }

    const token = this._signToken(client);
    return {
      client,
      access_token: token,
    };
  }

  /**
   * جلب إعدادات تسعيرة المنصة الحية المعتمدة
   */
  async getPricingSettings() {
    const [settings] = await this.db.query(
      `SELECT base_fee, per_km_rate, min_order_price, surge_multiplier, commission_rate FROM platform_settings WHERE id = 1`,
    );
    return {
      base_fee: parseFloat(settings?.base_fee ?? 300),
      per_km_rate: parseFloat(settings?.per_km_rate ?? 50),
      min_order_price: parseFloat(settings?.min_order_price ?? 250),
      surge_multiplier: parseFloat(settings?.surge_multiplier ?? 1.0),
      commission_rate: parseFloat(settings?.commission_rate ?? 15.0),
    };
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────
  private _signToken(user: { id: string; role: string; phone: string }) {
    return this.jwtService.sign({
      sub:   user.id,
      role:  user.role,
      phone: user.phone,
    });
  }
}
