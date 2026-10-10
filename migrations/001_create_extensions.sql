-- ===================================================================
-- Migration 001: تفعيل امتدادات PostgreSQL
-- ===================================================================
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
