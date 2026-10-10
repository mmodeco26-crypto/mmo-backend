-- ===================================================================
-- Migration 004: جدول الطلبات مع Spatial Indexes
-- ===================================================================
CREATE TYPE order_status AS ENUM (
    'pending',
    'accepted',
    'picked_up',
    'in_transit',
    'delivered',
    'cancelled'
);

CREATE TABLE orders (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id           UUID NOT NULL REFERENCES users(id),
    driver_id           UUID REFERENCES users(id),

    -- نقطة الانطلاق
    pickup_address      TEXT              NOT NULL,
    pickup_location     GEOGRAPHY(POINT, 4326) NOT NULL,
    pickup_lat          DOUBLE PRECISION  NOT NULL,
    pickup_lng          DOUBLE PRECISION  NOT NULL,

    -- نقطة الوصول
    dropoff_address     TEXT              NOT NULL,
    dropoff_location    GEOGRAPHY(POINT, 4326) NOT NULL,
    dropoff_lat         DOUBLE PRECISION  NOT NULL,
    dropoff_lng         DOUBLE PRECISION  NOT NULL,

    -- التسعير (Backend فقط — لا يُقبل من Frontend أبداً)
    distance_km         NUMERIC(8,3)      NOT NULL,
    base_price          NUMERIC(10,2)     NOT NULL,
    price_per_km        NUMERIC(10,2)     NOT NULL,
    total_price         NUMERIC(10,2)     NOT NULL,

    -- الحالة والتواريخ
    status              order_status      NOT NULL DEFAULT 'pending',
    notes               TEXT,
    accepted_at         TIMESTAMPTZ,
    picked_up_at        TIMESTAMPTZ,
    delivered_at        TIMESTAMPTZ,
    cancelled_at        TIMESTAMPTZ,
    cancel_reason       TEXT,

    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ✅ Spatial Indexes على نقاط الطلب
CREATE INDEX idx_orders_pickup_location  ON orders USING GIST(pickup_location);
CREATE INDEX idx_orders_dropoff_location ON orders USING GIST(dropoff_location);

-- Index على الحالة (أكثر استعلام متكرر)
CREATE INDEX idx_orders_status     ON orders(status);
CREATE INDEX idx_orders_client_id  ON orders(client_id);
CREATE INDEX idx_orders_driver_id  ON orders(driver_id);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Index مركّب للبحث عن الطلبات المعلقة مرتبة بالوقت
CREATE INDEX idx_orders_pending_created ON orders(created_at DESC)
    WHERE status = 'pending';

CREATE TRIGGER orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
