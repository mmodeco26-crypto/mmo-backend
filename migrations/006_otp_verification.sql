-- ===================================================================
-- Migration 006: جدول أكواد التحقق السريعة عبر الهاتف (SMS OTP)
-- ===================================================================

CREATE TABLE IF NOT EXISTS otp_codes (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone      VARCHAR(20) NOT NULL,
    code       VARCHAR(6)  NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    is_used    BOOLEAN     NOT NULL DEFAULT FALSE,
    attempts   INT         NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_otp_phone_active ON otp_codes(phone, is_used) 
    WHERE is_used = FALSE;
