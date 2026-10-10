import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
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

  // ─── Helpers ───────────────────────────────────────────────────────────────
  private _signToken(user: { id: string; role: string; phone: string }) {
    return this.jwtService.sign({
      sub:   user.id,
      role:  user.role,
      phone: user.phone,
    });
  }
}
