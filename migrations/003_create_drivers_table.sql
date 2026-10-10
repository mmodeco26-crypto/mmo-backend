-- ===================================================================
-- Migration 003: جدول السائقين مع PostGIS Geography
-- ===================================================================
CREATE TABLE drivers (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vehicle_plate  VARCHAR(20) NOT NULL,
    is_online      BOOLEAN     NOT NULL DEFAULT FALSE,
    is_verified    BOOLEAN     NOT NULL DEFAULT FALSE,
    current_rating NUMERIC(3,2)         DEFAULT 5.00,
    total_orders   INTEGER              DEFAULT 0,

    -- عمود PostGIS للبحث الجغرافي الدقيق
    location       GEOGRAPHY(POINT, 4326),

    -- نسخ احتياطية للقراءة السريعة
    lat            DOUBLE PRECISION,
    lng            DOUBLE PRECISION,

    last_seen_at   TIMESTAMPTZ,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ✅ Spatial Index — جوهر البحث الجغرافي بأداء O(log n)
CREATE INDEX idx_drivers_location ON drivers USING GIST(location);

-- Index جزئي: فقط السائقون المتصلون (يُسرّع استعلامات البحث كثيراً)
CREATE INDEX idx_drivers_online   ON drivers(is_online) WHERE is_online = TRUE;

CREATE UNIQUE INDEX idx_drivers_user_id ON drivers(user_id);

CREATE TRIGGER drivers_updated_at
    BEFORE UPDATE ON drivers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
