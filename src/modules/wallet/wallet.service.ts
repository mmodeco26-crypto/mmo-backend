import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class WalletService {
  private readonly DEFAULT_COMMISSION_RATE = 0.15; // 15% عمولة المنصة

  constructor(@InjectDataSource() private readonly db: DataSource) {}

  /**
   * جلب المحفظة للمستخدم (إن لم تكن موجودة، يتم إنشاؤها تلقائياً)
   */
  async getOrCreateWallet(userId: string) {
    let [wallet] = await this.db.query(
      `SELECT * FROM wallets WHERE user_id = $1`,
      [userId],
    );

    if (!wallet) {
      [wallet] = await this.db.query(
        `INSERT INTO wallets (user_id, balance, debt_limit, currency)
         VALUES ($1, 0.00, 3000.00, 'DZD')
         RETURNING *`,
        [userId],
      );
    }

    return wallet;
  }

  /**
   * سجل معاملات المحفظة
   */
  async getTransactions(userId: string) {
    const wallet = await this.getOrCreateWallet(userId);
    return this.db.query(
      `SELECT * FROM wallet_transactions 
       WHERE wallet_id = $1 
       ORDER BY created_at DESC 
       LIMIT 50`,
      [wallet.id],
    );
  }

  /**
   * خصم عمولة المنصة عند استلام السائق للمبلغ كاش من العميل
   * تُستدعى تلقائياً عند تحويل الطلب إلى "delivered"
   */
  async deductOrderCommission(orderId: string, driverId: string, orderTotalPrice: number) {
    const [settings] = await this.db.query(
      `SELECT commission_rate FROM platform_settings WHERE id = 1`,
    );
    const commissionPct = settings?.commission_rate ? parseFloat(settings.commission_rate) : 15.0;
    const commission = parseFloat(((orderTotalPrice * commissionPct) / 100.0).toFixed(2));
    const wallet = await this.getOrCreateWallet(driverId);

    const newBalance = parseFloat(wallet.balance) - commission;

    const queryRunner = this.db.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. تحديث رصيد المحفظة
      await queryRunner.query(
        `UPDATE wallets 
         SET balance = $1, updated_at = NOW() 
         WHERE id = $2`,
        [newBalance, wallet.id],
      );

      // 2. تسجيل المعاملة في السجل
      await queryRunner.query(
        `INSERT INTO wallet_transactions (wallet_id, order_id, type, amount, balance_after, description)
         VALUES ($1, $2, 'commission_deduction', $3, $4, $5)`,
        [
          wallet.id,
          orderId,
          -commission,
          newBalance,
          `خصم عمولة المنصة (${commissionPct}%) للطلب #${orderId.slice(0, 8)}`,
        ],
      );

      // 3. التحقق مما إذا كان السائق تجاوز سقف الدين المسموح (مثلاً دين أكثر من 3000 دج)
      const currentDebt = -newBalance;
      if (currentDebt > parseFloat(wallet.debt_limit)) {
        // إيقاف السائق تلقائياً عن استقبال الطلبات
        await queryRunner.query(
          `UPDATE drivers 
           SET is_online = FALSE 
           WHERE user_id = $1`,
          [driverId],
        );
      }

      await queryRunner.commitTransaction();
      return { commission, newBalance, debtExceeded: currentDebt > parseFloat(wallet.debt_limit) };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * شحن رصيد المحفظة لتسديد مستحقات المنصة
   */
  async topUpWallet(userId: string, amount: number, reference = 'Deposit') {
    if (amount <= 0) {
      throw new BadRequestException('مبلغ الشحن يجب أن يكون أكبر من الصفر');
    }

    const wallet = await this.getOrCreateWallet(userId);
    const newBalance = parseFloat(wallet.balance) + amount;

    const queryRunner = this.db.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.query(
        `UPDATE wallets 
         SET balance = $1, updated_at = NOW() 
         WHERE id = $2`,
        [newBalance, wallet.id],
      );

      await queryRunner.query(
        `INSERT INTO wallet_transactions (wallet_id, type, amount, balance_after, description)
         VALUES ($1, 'deposit', $2, $3, $4)`,
        [wallet.id, amount, newBalance, `شحن رصيد: ${reference}`],
      );

      await queryRunner.commitTransaction();
      return { success: true, newBalance };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * التحقق مما إذا كان السائق مؤهلاً لقبول طلبات جديدة مالياً وتوثيقياً
   */
  async assertDriverCanAcceptOrders(driverId: string) {
    const [driver] = await this.db.query(
      `SELECT is_verified, kyc_status FROM drivers WHERE user_id = $1`,
      [driverId],
    );

    if (driver?.kyc_status === 'suspended') {
      throw new ForbiddenException('حسابك موقوف ومجمّد مؤقتاً من إدارة المنصة');
    }

    if (driver?.kyc_status !== 'approved' && !driver?.is_verified) {
      throw new ForbiddenException('حسابك قيد المراجعة، يرجى انتظار توثيق وثائقك من الإدارة (KYC)');
    }

    const wallet = await this.getOrCreateWallet(driverId);
    const currentDebt = -parseFloat(wallet.balance);

    if (currentDebt > parseFloat(wallet.debt_limit)) {
      throw new ForbiddenException(
        `تجاوزت سقف الديون المسموح به (${wallet.debt_limit} ${wallet.currency}). يرجى شحن محفظتك لمواصلة استقبال الطلبات.`,
      );
    }
  }
}
