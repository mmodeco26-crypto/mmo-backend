-- ===================================================================
-- Migration 008: جداول إعدادات الأسعار، نسبة العمولة، وأكواد الخصم
-- ===================================================================

-- 1. جدول إعدادات المنصة والأسعار (Singleton Table)
CREATE TABLE IF NOT EXISTS platform_settings (
    id                 INTEGER PRIMARY KEY DEFAULT 1,
    base_fee           NUMERIC(10,2) NOT NULL DEFAULT 200.00,       -- سعر فتح العداد
    per_km_rate        NUMERIC(10,2) NOT NULL DEFAULT 50.00,        -- السعر لكل كيلومتر
    min_order_price    NUMERIC(10,2) NOT NULL DEFAULT 250.00,       -- الحد الأدنى لسعر التوصيل
    commission_rate    NUMERIC(5,2)  NOT NULL DEFAULT 15.00,        -- نسبة عمولة المنصة مئوية (15%)
    default_debt_limit NUMERIC(10,2) NOT NULL DEFAULT 3000.00,      -- سقف ديون السائق الافتراضي
    surge_multiplier   NUMERIC(4,2)  NOT NULL DEFAULT 1.00,         -- معامل أوقات الذروة
    updated_at         TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    CONSTRAINT single_row_settings CHECK (id = 1)
);

-- إدخال الإعدادات الافتراضية الأولية إن لم تكن موجودة
INSERT INTO platform_settings (
    id, base_fee, per_km_rate, min_order_price, commission_rate, default_debt_limit, surge_multiplier
) VALUES (
    1, 200.00, 50.00, 250.00, 15.00, 3000.00, 1.00
) ON CONFLICT (id) DO NOTHING;

-- 2. جدول أكواد الخصم والعروض الترويجية (Promo Codes)
CREATE TABLE IF NOT EXISTS promo_codes (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code            VARCHAR(50) NOT NULL UNIQUE,
    discount_type   VARCHAR(20) NOT NULL DEFAULT 'percentage',      -- 'percentage' أو 'fixed'
    discount_value  NUMERIC(10,2) NOT NULL,                         -- قيمة الخصم (مثلاً 20 أو 200)
    max_discount    NUMERIC(10,2),                                  -- أقصى خصم بالدينار (في حالة النسبة)
    min_order_price NUMERIC(10,2) DEFAULT 0.00,                    -- الحد الأدنى للطلب لتفعيل الكوبون
    usage_limit     INTEGER DEFAULT 100,                            -- أقصى عدد لمرات الاستخدام
    used_count      INTEGER DEFAULT 0,                              -- عدد المرات المستخدمة
    is_active       BOOLEAN DEFAULT TRUE,                           -- تفعيل / تعطيل الكود
    expires_at      TIMESTAMPTZ,                                    -- تاريخ انتهاء الصلاحية
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- إدخال كود خصم ترحيبي تجريبي
INSERT INTO promo_codes (
    code, discount_type, discount_value, max_discount, min_order_price, usage_limit, is_active, expires_at
) VALUES (
    'BIENVENUE', 'percentage', 20.00, 500.00, 300.00, 1000, TRUE, NOW() + INTERVAL '30 days'
) ON CONFLICT (code) DO NOTHING;
