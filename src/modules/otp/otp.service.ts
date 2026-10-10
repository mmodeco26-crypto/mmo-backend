import {
  Injectable,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);

  constructor(@InjectDataSource() private readonly db: DataSource) {}

  /**
   * توليد وإرسال كود OTP لرقم الهاتف
   */
  async sendOtp(phone: string) {
    if (!phone || phone.length < 8) {
      throw new BadRequestException('رقم الهاتف غير صالح');
    }

    // 1. إبطال الأكواد السابقة لهذا الرقم لمنع التكرار
    await this.db.query(
      `UPDATE otp_codes 
       SET is_used = TRUE 
       WHERE phone = $1 AND is_used = FALSE`,
      [phone],
    );

    // 2. توليد كود عشوائي من 6 أرقام (أو 123456 في بيئة التطوير السريعة)
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // صالح لـ 5 دقائق

    // 3. تخزين الكود في قاعدة البيانات
    await this.db.query(
      `INSERT INTO otp_codes (phone, code, expires_at)
       VALUES ($1, $2, $3)`,
      [phone, code, expiresAt],
    );

    // 4. محاكاة إرسال الرسالة القصيرة (SMS Gateway)
    this.logger.log(`📲 [SMS GATEWAY] OTP sent to ${phone}: >>> ${code} <<< (valid for 5 mins)`);

    return {
      success: true,
      message: `تم إرسال رمز التحقق إلى ${phone}`,
      expiresInSeconds: 300,
      // في بيئة التطوير نرجع الكود مباشرة لتسهيل الاختبار بدون رصيد SMS
      debugCode: process.env.NODE_ENV !== 'production' ? code : undefined,
    };
  }

  /**
   * التحقق من صحة كود OTP المدخل
   */
  async verifyOtp(phone: string, code: string): Promise<boolean> {
    const [record] = await this.db.query(
      `SELECT id, code, expires_at, is_used, attempts 
       FROM otp_codes 
       WHERE phone = $1 AND is_used = FALSE 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [phone],
    );

    if (!record) {
      throw new BadRequestException('لم يتم طلب أي رمز تحقق لهذا الرقم أو انتهت صلاحيته');
    }

    if (new Date() > new Date(record.expires_at)) {
      throw new BadRequestException('انتهت صلاحية رمز التحقق (أكثر من 5 دقائق)، اطلب رمزاً جديداً');
    }

    if (record.attempts >= 4) {
      await this.db.query(`UPDATE otp_codes SET is_used = TRUE WHERE id = $1`, [record.id]);
      throw new BadRequestException('تجاوزت الحد المسموح من المحاولات الخاطئة، اطلب رمزاً جديداً');
    }

    if (record.code !== code) {
      await this.db.query(`UPDATE otp_codes SET attempts = attempts + 1 WHERE id = $1`, [record.id]);
      throw new BadRequestException('رمز التحقق غير صحيح');
    }

    // تم التحقق بنجاح -> تعليم الكود كمستخدم
    await this.db.query(`UPDATE otp_codes SET is_used = TRUE WHERE id = $1`, [record.id]);
    return true;
  }
}
