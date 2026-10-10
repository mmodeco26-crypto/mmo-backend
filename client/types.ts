export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicle_model: string;
  vehicle_plate: string;
  wallet_balance: number;
  rating: number;
  is_online: boolean;
  kyc_status: 'approved' | 'pending' | 'rejected' | 'suspended';
  lat: number;
  lng: number;
  total_deliveries: number;
  joined_date: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  total_orders: number;
  total_spent: number;
  is_active: boolean;
  joined_date: string;
}

export interface Order {
  id: string;
  client_name: string;
  client_phone: string;
  driver_name?: string;
  driver_phone?: string;
  pickup_address: string;
  dropoff_address: string;
  pickup_lat: number;
  pickup_lng: number;
  dropoff_lat: number;
  dropoff_lng: number;
  distance_km: number;
  total_price: number;
  discount_amount: number;
  promo_code?: string;
  status: 'pending' | 'accepted' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  created_at: string;
}

export interface KYCRequest {
  id: string;
  driver_id: string;
  driver_name: string;
  phone: string;
  vehicle_model: string;
  vehicle_plate: string;
  license_number: string;
  submission_date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface PromoCode {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  max_discount?: number;
  used_count: number;
  is_active: boolean;
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'admin' | 'agent';
  is_active: boolean;
  created_at: string;
}

export interface PlatformSettings {
  base_fee: number;
  per_km_rate: number;
  min_order_price: number;
  commission_rate: number;
  surge_multiplier: number;
  default_debt_limit: number;
}
