import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateDriverAdminDto } from './dto/create-driver-admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectDataSource() private readonly db: DataSource) {}

  /**
   * إحصائيات لوحة التحكم الحية (Executive Dashboard)
   */
  async getDashboardAnalytics() {
    // 1. إحصائيات الطلبات حسب الحالة
    const ordersStats = await this.db.query(`
      SELECT 
        status, 
        COUNT(id) as count, 
        COALESCE(SUM(total_price), 0) as total_volume
      FROM orders 
      GROUP BY status
    `);

    // 2. قراءة نسبة عمولة المنصة الحالية
    const [settingsRow] = await this.db.query(
      `SELECT commission_rate FROM platform_settings WHERE id = 1`,
    );
    const commPct = settingsRow?.commission_rate ? parseFloat(settingsRow.commission_rate) : 15.0;
    const commMultiplier = commPct / 100.0;

    // 3. إجمالي المبيعات والعمولات للأوامر المسلمة فقط
    const [revenue] = await this.db.query(`
      SELECT 
        COALESCE(SUM(total_price), 0) as total_gmv,
        COALESCE(SUM(total_price * ${commMultiplier}), 0) as platform_commission,
        COUNT(id) as delivered_orders
      FROM orders 
      WHERE status = 'delivered'
    `);

    // 3. إحصائيات السائقين والزبائن
    const [counts] = await this.db.query(`
      SELECT
        (SELECT COUNT(id) FROM users WHERE role = 'client') as total_clients,
        (SELECT COUNT(id) FROM drivers) as total_drivers,
        (SELECT COUNT(id) FROM drivers WHERE is_online = TRUE) as online_drivers,
        (SELECT COUNT(id) FROM drivers WHERE kyc_status = 'pending') as pending_kyc_drivers,
        (SELECT COUNT(id) FROM users WHERE role IN ('admin', 'agent')) as total_agents
    `);

    // 4. أحدث 10 طلبات
    const recentOrders = await this.db.query(`
      SELECT 
        o.id, o.pickup_address, o.dropoff_address, o.total_price, o.status, o.created_at,
        c.name as client_name, d.name as driver_name
      FROM orders o
      LEFT JOIN users c ON c.id = o.client_id
      LEFT JOIN users d ON d.id = o.driver_id
      ORDER BY o.created_at DESC
      LIMIT 10
    `);

    return {
      revenue: {
        totalGmv: parseFloat(revenue.total_gmv),
        platformCommission: parseFloat(revenue.platform_commission),
        commissionRate: commPct,
        deliveredOrders: parseInt(revenue.delivered_orders, 10),
      },
      counts: {
        totalClients: parseInt(counts.total_clients, 10),
        totalDrivers: parseInt(counts.total_drivers, 10),
        onlineDrivers: parseInt(counts.online_drivers, 10),
        pendingKycDrivers: parseInt(counts.pending_kyc_drivers, 10),
        totalAgents: parseInt(counts.total_agents, 10),
      },
      ordersByStatus: ordersStats,
      recentOrders,
    };
  }

  /**
   * جلب السائقين الذين ينتظرون مراجعة وتوثيق وثائقهم (KYC)
   */
  async getPendingKYCDrivers() {
    return this.db.query(`
      SELECT 
        d.id as driver_id, d.user_id, d.vehicle_plate, d.kyc_status,
        d.license_photo, d.national_id_photo, d.created_at,
        u.name, u.phone, u.email
      FROM drivers d
      JOIN users u ON u.id = d.user_id
      WHERE d.kyc_status = 'pending'
      ORDER BY d.created_at ASC
    `);
  }

  /**
   * اعتماد أو رفض وثائق السائق (KYC Verification)
   */
  async verifyDriverKYC(
    driverId: string,
    status: 'approved' | 'rejected',
    reason?: string,
  ) {
    const isVerified = status === 'approved';
    const [driver] = await this.db.query(
      `UPDATE drivers
       SET kyc_status = $1, is_verified = $2, rejection_reason = $3, updated_at = NOW()
       WHERE id = $4 OR user_id = $4
       RETURNING *`,
      [status, isVerified, reason ?? null, driverId],
    );

    if (!driver) {
      throw new NotFoundException('السائق غير موجود');
    }

    return {
      message: status === 'approved' ? 'تم اعتماد وتفعيل السائق بنجاح' : 'تم رفض طلب السائق',
      driver,
    };
  }

  /**
   * إضافة سائق جديد مباشرة من لوحة تحكم الأدمن
   */
  async createDriver(dto: CreateDriverAdminDto) {
    // 1. فحص وجود رقم الهاتف مسبقاً
    const [existing] = await this.db.query(
      `SELECT id FROM users WHERE phone = $1`,
      [dto.phone],
    );
    if (existing) {
      throw new BadRequestException('رقم الهاتف مسجل مسبقاً في النظام');
    }

    const rawPassword = dto.password || '123456';
    const hashedPassword = await bcrypt.hash(rawPassword, 12);
    const isVerified = dto.is_verified ?? true;
    const kycStatus = isVerified ? 'approved' : 'pending';
    const lat = dto.lat ?? 36.7538;
    const lng = dto.lng ?? 3.0588;

    const queryRunner = this.db.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // أ. إنشاء المستخدم
      const [user] = await queryRunner.query(
        `INSERT INTO users (name, phone, email, password, role, is_active)
         VALUES ($1, $2, $3, $4, 'driver', TRUE)
         RETURNING id, name, phone, email, role, is_active, created_at`,
        [dto.name, dto.phone, dto.email ?? null, hashedPassword],
      );

      // ب. إنشاء ملف السائق مع إحداثيات وموقع جغرافي PostGIS
      const [driver] = await queryRunner.query(
        `INSERT INTO drivers (
           user_id, vehicle_plate, is_online, is_verified, kyc_status,
           lat, lng, location, last_seen_at
         )
         VALUES (
           $1, $2, TRUE, $3, $4,
           $5, $6, ST_SetSRID(ST_MakePoint($6, $5), 4326), NOW()
         )
         RETURNING *`,
        [user.id, dto.vehicle_plate, isVerified, kycStatus, lat, lng],
      );

      // ج. إنشاء المحفظة المالية
      await queryRunner.query(
        `INSERT INTO wallets (user_id, balance, debt_limit, currency)
         VALUES ($1, 0.00, 3000.00, 'DZD')
         ON CONFLICT (user_id) DO NOTHING`,
        [user.id],
      );

      await queryRunner.commitTransaction();

      return {
        message: 'تم إضافة السائق بنجاح',
        driver: {
          ...driver,
          name: user.name,
          phone: user.phone,
          is_active: user.is_active,
          wallet_balance: '0.00',
        },
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * تجميد مؤقت لعمل السائق (Suspend / Unsuspend)
   */
  async suspendDriver(driverId: string, isSuspended: boolean, reason?: string) {
    const kycStatus = isSuspended ? 'suspended' : 'approved';
    const isVerified = !isSuspended;
    const rejectionReason = isSuspended
      ? (reason || 'تم تجميد وتعليق الحساب مؤقتاً بقرار إداري')
      : null;

    const [driver] = await this.db.query(
      `UPDATE drivers
       SET kyc_status = $1,
           is_verified = $2,
           is_online = CASE WHEN $3 = TRUE THEN FALSE ELSE is_online END,
           rejection_reason = $4,
           updated_at = NOW()
       WHERE id = $5 OR user_id = $5
       RETURNING *`,
      [kycStatus, isVerified, isSuspended, rejectionReason, driverId],
    );

    if (!driver) {
      throw new NotFoundException('السائق غير موجود');
    }

    return {
      message: isSuspended ? 'تم تجميد السائق مؤقتاً (Suspend)' : 'تم رفع التجميد وتفعيل السائق',
      driver,
    };
  }

  /**
   * حظر أو إلغاء حظر حساب أي مستخدم كلياً (Block / Unblock)
   */
  async toggleUserBlock(userId: string, isActive: boolean) {
    const [user] = await this.db.query(
      `UPDATE users 
       SET is_active = $1, updated_at = NOW() 
       WHERE id = $2 
       RETURNING id, name, phone, role, is_active`,
      [isActive, userId],
    );

    if (!user) {
      throw new NotFoundException('المستخدم غير موجود');
    }

    // إذا تم حظر الحساب، نقوم بفصل اتصاله كسائق فوراً
    if (!isActive) {
      await this.db.query(
        `UPDATE drivers SET is_online = FALSE WHERE user_id = $1`,
        [userId],
      );
    }

    return {
      message: isActive ? 'تم تنشيط الحساب (Unblock)' : 'تم حظر وتجميد الحساب كلياً (Block)',
      user,
    };
  }

  /**
   * قائمة جميع السائقين مع أرصدة محافظهم وديونهم وتقييماتهم
   */
  async getAllDrivers() {
    return this.db.query(`
      SELECT 
        d.id as driver_id, d.vehicle_plate, d.is_online, d.is_verified, d.kyc_status,
        d.current_rating, d.total_orders, d.last_seen_at, d.lat, d.lng, d.rejection_reason,
        u.id as user_id, u.name, u.phone, u.is_active,
        COALESCE(w.balance, 0.00) as wallet_balance,
        COALESCE(w.debt_limit, 3000.00) as debt_limit
      FROM drivers d
      JOIN users u ON u.id = d.user_id
      LEFT JOIN wallets w ON w.user_id = d.user_id
      ORDER BY d.created_at DESC
    `);
  }

  /**
   * قائمة جميع الزبائن (Clients) مع إحصائيات طلباتهم وإنفاقهم
   */
  async getAllClients() {
    return this.db.query(`
      SELECT 
        u.id as user_id, u.name, u.phone, u.email, u.is_active, u.created_at,
        COUNT(o.id) as total_orders,
        COALESCE(SUM(CASE WHEN o.status = 'delivered' THEN o.total_price ELSE 0 END), 0) as total_spent,
        COALESCE(w.balance, 0.00) as wallet_balance
      FROM users u
      LEFT JOIN orders o ON o.client_id = u.id
      LEFT JOIN wallets w ON w.user_id = u.id
      WHERE u.role = 'client'
      GROUP BY u.id, u.name, u.phone, u.email, u.is_active, u.created_at, w.balance
      ORDER BY u.created_at DESC
    `);
  }

  /**
   * إنشاء زبون جديد مباشرة من لوحة التحكم (Ajouter Client)
   */
  async createClient(dto: { name: string; phone: string; password?: string; email?: string }) {
    const [existing] = await this.db.query(
      `SELECT id FROM users WHERE phone = $1`,
      [dto.phone],
    );
    if (existing) {
      throw new BadRequestException('رقم الهاتف مسجل مسبقاً في النظام');
    }

    const rawPassword = dto.password || '123456';
    const hashedPassword = await bcrypt.hash(rawPassword, 12);

    const [user] = await this.db.query(
      `INSERT INTO users (name, phone, email, password, role, is_active)
       VALUES ($1, $2, $3, $4, 'client', TRUE)
       RETURNING id, name, phone, email, role, is_active, created_at`,
      [dto.name, dto.phone, dto.email ?? null, hashedPassword],
    );

    await this.db.query(
      `INSERT INTO wallets (user_id, balance, debt_limit, currency)
       VALUES ($1, 0.00, 0.00, 'DZD')
       ON CONFLICT (user_id) DO NOTHING`,
      [user.id],
    );

    return {
      message: 'تم إضافة الزبون بنجاح',
      client: user,
    };
  }

  /**
   * جلب إعدادات المنصة الحالية (الأسعار، العمولات، سقف الديون)
   */
  async getPlatformSettings() {
    const [settings] = await this.db.query(
      `SELECT * FROM platform_settings WHERE id = 1`,
    );
    return settings || {
      base_fee: '200.00',
      per_km_rate: '50.00',
      min_order_price: '250.00',
      commission_rate: '15.00',
      default_debt_limit: '3000.00',
      surge_multiplier: '1.00',
    };
  }

  /**
   * تحديث إعدادات المنصة والأسعار ونسبة العمولة
   */
  async updatePlatformSettings(dto: {
    base_fee?: number;
    per_km_rate?: number;
    min_order_price?: number;
    commission_rate?: number;
    default_debt_limit?: number;
    surge_multiplier?: number;
  }) {
    const current = await this.getPlatformSettings();

    const baseFee = dto.base_fee !== undefined ? dto.base_fee : parseFloat(current.base_fee);
    const perKmRate = dto.per_km_rate !== undefined ? dto.per_km_rate : parseFloat(current.per_km_rate);
    const minOrderPrice = dto.min_order_price !== undefined ? dto.min_order_price : parseFloat(current.min_order_price);
    const commissionRate = dto.commission_rate !== undefined ? dto.commission_rate : parseFloat(current.commission_rate);
    const defaultDebtLimit = dto.default_debt_limit !== undefined ? dto.default_debt_limit : parseFloat(current.default_debt_limit);
    const surgeMultiplier = dto.surge_multiplier !== undefined ? dto.surge_multiplier : parseFloat(current.surge_multiplier || '1.0');

    const [updated] = await this.db.query(
      `UPDATE platform_settings
       SET base_fee = $1,
           per_km_rate = $2,
           min_order_price = $3,
           commission_rate = $4,
           default_debt_limit = $5,
           surge_multiplier = $6,
           updated_at = NOW()
       WHERE id = 1
       RETURNING *`,
      [baseFee, perKmRate, minOrderPrice, commissionRate, defaultDebtLimit, surgeMultiplier],
    );

    // تحديث سقف ديون السائقين إن طُلب ذلك
    if (dto.default_debt_limit !== undefined) {
      await this.db.query(
        `UPDATE wallets SET debt_limit = $1`,
        [defaultDebtLimit],
      );
    }

    return {
      message: 'تم حفظ وتحديث إعدادات الأسعار والعمولات بنجاح',
      settings: updated,
    };
  }

  /**
   * قائمة جميع أكواد الخصم والعروض الترويجية
   */
  async getAllPromoCodes() {
    return this.db.query(
      `SELECT * FROM promo_codes ORDER BY created_at DESC`,
    );
  }

  /**
   * إنشاء كود خصم جديد (Créer Promo Code)
   */
  async createPromoCode(dto: {
    code: string;
    discount_type: 'percentage' | 'fixed';
    discount_value: number;
    max_discount?: number;
    min_order_price?: number;
    usage_limit?: number;
    expires_at?: string;
  }) {
    const cleanCode = dto.code.trim().toUpperCase();

    const [existing] = await this.db.query(
      `SELECT id FROM promo_codes WHERE code = $1`,
      [cleanCode],
    );
    if (existing) {
      throw new BadRequestException('كود الخصم هذا مسجل وموجود مسبقاً');
    }

    const [promo] = await this.db.query(
      `INSERT INTO promo_codes (
         code, discount_type, discount_value, max_discount, min_order_price, usage_limit, expires_at
       ) VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        cleanCode,
        dto.discount_type,
        dto.discount_value,
        dto.max_discount ?? null,
        dto.min_order_price ?? 0.0,
        dto.usage_limit ?? 100,
        dto.expires_at ? new Date(dto.expires_at) : null,
      ],
    );

    return {
      message: 'تم إنشاء كود الخصم بنجاح',
      promo,
    };
  }

  /**
   * تفعيل أو تعطيل كود خصم
   */
  async togglePromoStatus(id: string, isActive: boolean) {
    const [promo] = await this.db.query(
      `UPDATE promo_codes SET is_active = $1 WHERE id = $2 RETURNING *`,
      [isActive, id],
    );
    if (!promo) {
      throw new NotFoundException('كود الخصم غير موجود');
    }
    return {
      message: isActive ? 'تم تفعيل كود الخصم' : 'تم تعطيل كود الخصم',
      promo,
    };
  }

  /**
   * حذف كود خصم نهائياً
   */
  async deletePromoCode(id: string) {
    const res = await this.db.query(
      `DELETE FROM promo_codes WHERE id = $1 RETURNING id`,
      [id],
    );
    if (res.length === 0) {
      throw new NotFoundException('كود الخصم غير موجود');
    }
    return { message: 'تم حذف كود الخصم بنجاح' };
  }

  /**
   * جلب معلومات المستخدم الحالي المسجل دخوله
   */
  async getCurrentUserProfile(userId: string) {
    const [user] = await this.db.query(
      `SELECT id, name, phone, email, role, is_active, created_at
       FROM users WHERE id = $1`,
      [userId],
    );
    if (!user) {
      throw new NotFoundException('المستخدم غير موجود');
    }
    return user;
  }

  /**
   * جلب قائمة جميع أعضاء الفريق الإداري والوكلاء (Staff / Agents & Admins)
   */
  async getAllAgents() {
    return this.db.query(
      `SELECT id, name, phone, email, role, is_active, created_at
       FROM users
       WHERE role IN ('admin', 'agent')
       ORDER BY created_at ASC`,
    );
  }

  /**
   * إنشاء حساب وكيل أو موظف جديد (Créer Agent / Admin)
   */
  async createAgent(dto: {
    name: string;
    phone: string;
    password?: string;
    email?: string;
    role?: 'admin' | 'agent';
  }) {
    const existing = await this.db.query(
      `SELECT id FROM users WHERE phone = $1`,
      [dto.phone.trim()],
    );
    if (existing.length > 0) {
      throw new BadRequestException('رقم الهاتف مسجل مسبقاً في النظام');
    }

    const rawPassword = dto.password?.trim() || 'Agent123!';
    const hashedPassword = await bcrypt.hash(rawPassword, 12);
    const assignedRole = dto.role === 'admin' ? 'admin' : 'agent';

    const [user] = await this.db.query(
      `INSERT INTO users (name, phone, email, password, role, is_active)
       VALUES ($1, $2, $3, $4, $5, TRUE)
       RETURNING id, name, phone, email, role, is_active, created_at`,
      [
        dto.name.trim(),
        dto.phone.trim(),
        dto.email ? dto.email.trim() : null,
        hashedPassword,
        assignedRole,
      ],
    );

    return {
      ...user,
      message: 'تم إنشاء حساب الوكيل بنجاح',
      agent: user,
    };
  }

  /**
   * تفعيل أو تعطيل حساب وكيل (Activer / Désactiver Agent)
   */
  async toggleAgentStatus(agentId: string, isActive: boolean, requestingUserId: string) {
    if (agentId === requestingUserId) {
      throw new BadRequestException('لا يمكنك تجميد حسابك الخاص');
    }

    const [agent] = await this.db.query(
      `UPDATE users
       SET is_active = $1, updated_at = NOW()
       WHERE id = $2 AND role IN ('admin', 'agent')
       RETURNING id, name, phone, role, is_active`,
      [isActive, agentId],
    );

    if (!agent) {
      throw new NotFoundException('حساب الوكيل غير موجود');
    }

    return {
      message: isActive ? 'تم تنشيط حساب الوكيل' : 'تم تعطيل حساب الوكيل',
      agent,
    };
  }

  /**
   * حذف حساب وكيل نهائياً (Supprimer Agent)
   */
  async deleteAgent(agentId: string, requestingUserId: string) {
    if (agentId === requestingUserId) {
      throw new BadRequestException('لا يمكنك حذف حسابك الخاص المسجل به الدخول حالياً');
    }

    const res = await this.db.query(
      `DELETE FROM users
       WHERE id = $1 AND role IN ('admin', 'agent')
       RETURNING id`,
      [agentId],
    );

    if (res.length === 0) {
      throw new NotFoundException('حساب الوكيل غير موجود أو لا ينتمي لفريق العمل');
    }

    return { message: 'تم حذف حساب الوكيل بنجاح' };
  }

  /**
   * إعادة تعيين كلمة المرور لحساب وكيل أو مشرف (Reset Password)
   */
  async resetAgentPassword(agentId: string, newPassword: string) {
    if (!newPassword || newPassword.length < 6) {
      throw new BadRequestException('كلمة المرور يجب أن لا تقل عن 6 أحرف أو أرقام');
    }
    const hashedPassword = await bcrypt.hash(newPassword.trim(), 12);
    const [agent] = await this.db.query(
      `UPDATE users
       SET password = $1, updated_at = NOW()
       WHERE id = $2 AND role IN ('admin', 'agent')
       RETURNING id, name, phone, role`,
      [hashedPassword, agentId],
    );
    if (!agent) {
      throw new NotFoundException('حساب الوكيل غير موجود');
    }
    return {
      message: 'تم تحديث كلمة المرور للوكيل بنجاح',
      agent,
    };
  }

  /**
   * إحصائيات مالية شاملة وسجل المعاملات
   */
  async getFinancialOverview() {
    const [revenueRes] = await this.db.query(`
      SELECT 
        COALESCE(SUM(ABS(amount)), 0) as total_commissions_earned
      FROM wallet_transactions
      WHERE type = 'commission_deduction'
    `);

    const [walletStats] = await this.db.query(`
      SELECT 
        COALESCE(SUM(CASE WHEN balance > 0 THEN balance ELSE 0 END), 0) as total_positive_balances,
        COALESCE(SUM(CASE WHEN balance < 0 THEN ABS(balance) ELSE 0 END), 0) as total_driver_debts,
        COUNT(*) as total_wallets
      FROM wallets
    `);

    const recentTransactions = await this.db.query(`
      SELECT 
        wt.id, wt.wallet_id, wt.type, wt.amount, wt.balance_after, wt.description, wt.created_at,
        u.name as user_name, u.phone as user_phone, u.role as user_role
      FROM wallet_transactions wt
      JOIN wallets w ON w.id = wt.wallet_id
      JOIN users u ON u.id = w.user_id
      ORDER BY wt.created_at DESC
      LIMIT 30
    `);

    return {
      total_commissions_earned: parseFloat(revenueRes?.total_commissions_earned || 0),
      total_positive_balances: parseFloat(walletStats?.total_positive_balances || 0),
      total_driver_debts: parseFloat(walletStats?.total_driver_debts || 0),
      total_wallets: parseInt(walletStats?.total_wallets || 0),
      recent_transactions: recentTransactions,
    };
  }

  /**
   * شحن رصيد محفظة السائق أو تسوية الديون نقدياً / بريدي موب
   */
  async topUpDriverWallet(driverId: string, amount: number, reference = 'شحن رصيد من الإدارة') {
    if (!amount || amount <= 0) {
      throw new BadRequestException('المبلغ يجب أن يكون أكبر من 0 دج');
    }

    const [driver] = await this.db.query(
      `SELECT user_id FROM drivers WHERE id = $1 OR user_id = $1`,
      [driverId],
    );
    if (!driver) {
      throw new NotFoundException('السائق غير موجود');
    }

    let [wallet] = await this.db.query(
      `SELECT id, balance FROM wallets WHERE user_id = $1`,
      [driver.user_id],
    );
    if (!wallet) {
      [wallet] = await this.db.query(
        `INSERT INTO wallets (user_id, balance, debt_limit, currency)
         VALUES ($1, 0.00, 3000.00, 'DZD') RETURNING id, balance`,
        [driver.user_id],
      );
    }

    const newBalance = parseFloat(wallet.balance) + amount;

    const queryRunner = this.db.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.query(
        `UPDATE wallets SET balance = $1, updated_at = NOW() WHERE id = $2`,
        [newBalance, wallet.id],
      );

      await queryRunner.query(
        `INSERT INTO wallet_transactions (wallet_id, type, amount, balance_after, description)
         VALUES ($1, 'deposit', $2, $3, $4)`,
        [wallet.id, amount, newBalance, reference],
      );

      await queryRunner.commitTransaction();
      return {
        message: 'تم شحن رصيد السائق بنجاح',
        new_balance: newBalance,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
