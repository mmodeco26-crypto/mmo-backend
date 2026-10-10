-- ===================================================================
-- Migration 005: نظام المحافظ المالية، التقييمات، والتوثيق الإداري (KYC)
-- ===================================================================

-- 1. إضافة حقول التحقق والتراخيص لجدول السائقين
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'kyc_status_enum') THEN
        CREATE TYPE kyc_status_enum AS ENUM ('pending', 'approved', 'rejected');
    END IF;
END $$;

ALTER TABLE drivers 
    ADD COLUMN IF NOT EXISTS kyc_status kyc_status_enum NOT NULL DEFAULT 'pending',
    ADD COLUMN IF NOT EXISTS license_photo TEXT,
    ADD COLUMN IF NOT EXISTS national_id_photo TEXT,
    ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- 2. جدول المحافظ المالية (Wallets)
CREATE TABLE IF NOT EXISTS wallets (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    balance     NUMERIC(12,2) NOT NULL DEFAULT 0.00,       -- الرصيد (موجب أو سالب للديون)
    debt_limit  NUMERIC(10,2) NOT NULL DEFAULT 3000.00,    -- سقف الدين المسموح به للسائق قبل الحظر التلقائي
    currency    VARCHAR(10) NOT NULL DEFAULT 'DZD',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets(user_id);

-- 3. سجل حركات المحفظة (Wallet Transactions)
CREATE TYPE transaction_type AS ENUM (
    'commission_deduction', -- خصم عمولة المنصة عند استلام الكاش
    'deposit',              -- شحن رصيد المحفظة من طرف السائق
    'payout',               -- سحب أرباح
    'bonus',                -- مكافأة
    'penalty'               -- غرامة
);

CREATE TABLE IF NOT EXISTS wallet_transactions (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_id      UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
    order_id       UUID REFERENCES orders(id) ON DELETE SET NULL,
    type           transaction_type NOT NULL,
    amount         NUMERIC(10,2) NOT NULL,            -- القيمة
    balance_after  NUMERIC(12,2) NOT NULL,            -- الرصيد بعد العملية
    description    TEXT,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transactions_wallet_id ON wallet_transactions(wallet_id);
CREATE INDEX IF NOT EXISTS idx_transactions_order_id  ON wallet_transactions(order_id);

-- 4. جدول التقييمات والمراجعات (Reviews)
CREATE TABLE IF NOT EXISTS reviews (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id    UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reviewee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating      SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment     TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_order_reviewer UNIQUE (order_id, reviewer_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_reviewee_id ON reviews(reviewee_id);
CREATE INDEX IF NOT EXISTS idx_reviews_order_id    ON reviews(order_id);
