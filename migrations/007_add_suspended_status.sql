-- ===================================================================
-- Migration 007: إضافة خيار suspended إلى kyc_status_enum
-- ===================================================================
ALTER TYPE kyc_status_enum ADD VALUE IF NOT EXISTS 'suspended';
