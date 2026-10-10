import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export interface PricingResult {
  baseFee: number;
  perKmRate: number;
  originalPrice: number;
  discountAmount: number;
  totalPrice: number;
  appliedPromo?: string;
}

@Injectable()
export class PricingService {
  private readonly EARTH_R_KM = 6371;

  constructor(@InjectDataSource() private readonly db: DataSource) {}

  /**
   * حساب المسافة بصيغة Haversine بالكيلومتر
   */
  calculateDistanceKm(
    lat1: number, lng1: number,
    lat2: number, lng2: number,
  ): number {
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.toRad(lat1)) *
      Math.cos(this.toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((this.EARTH_R_KM * c).toFixed(3));
  }

  /**
   * حساب مسافة الطريق الحقيقية (Road Distance) عبر محرك الطرق OSRM مع fallback ذكي
   */
  async calculateRoadDistanceKm(
    lat1: number, lng1: number,
    lat2: number, lng2: number,
  ): Promise<number> {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${lng1},${lat1};${lng2},${lat2}?overview=false`;
      const res = await fetch(url, { signal: AbortSignal.timeout(2500) });
      const data = await res.json();
      if (data?.routes?.[0]?.distance) {
        return parseFloat((data.routes[0].distance / 1000).toFixed(2));
      }
    } catch (e) {
      // في حالة انقطاع مؤقت لخدمة التوجيه، استخدام Haversine مع معامل انحناء الطرق (1.25)
    }
    const haversine = this.calculateDistanceKm(lat1, lng1, lat2, lng2);
    return parseFloat((haversine * 1.25).toFixed(2));
  }

  /**
   * جلب الإعدادات الحية الحالية من قاعدة البيانات
   */
  async getSettings() {
    const [settings] = await this.db.query(
      `SELECT * FROM platform_settings WHERE id = 1`,
    );
    return settings || {
      base_fee: 200.00,
      per_km_rate: 50.00,
      min_order_price: 250.00,
      commission_rate: 15.00,
      default_debt_limit: 3000.00,
      surge_multiplier: 1.00,
    };
  }

  /**
   * حساب السعر المعتمد على إعدادات المنصة الحية + كود الخصم (إن وجد)
   */
  async calculatePrice(distanceKm: number, promoCode?: string): Promise<PricingResult> {
    const settings = await this.getSettings();

    const baseFee = parseFloat(settings.base_fee);
    const perKmRate = parseFloat(settings.per_km_rate);
    const minOrderPrice = parseFloat(settings.min_order_price);
    const surgeMultiplier = parseFloat(settings.surge_multiplier || '1.0');

    // السعر الخام
    const rawTotal = (baseFee + distanceKm * perKmRate) * surgeMultiplier;
    const originalPrice = parseFloat(Math.max(minOrderPrice, rawTotal).toFixed(2));

    let discountAmount = 0;
    let appliedPromo: string | undefined = undefined;

    if (promoCode && promoCode.trim()) {
      const cleanCode = promoCode.trim().toUpperCase();
      const [promo] = await this.db.query(
        `SELECT * FROM promo_codes WHERE code = $1 AND is_active = TRUE`,
        [cleanCode],
      );

      if (promo) {
        const now = new Date();
        const notExpired = !promo.expires_at || new Date(promo.expires_at) > now;
        const withinLimit = promo.used_count < promo.usage_limit;
        const meetsMinPrice = originalPrice >= parseFloat(promo.min_order_price || '0');

        if (notExpired && withinLimit && meetsMinPrice) {
          if (promo.discount_type === 'percentage') {
            const pctDiscount = (originalPrice * parseFloat(promo.discount_value)) / 100;
            const maxCap = promo.max_discount ? parseFloat(promo.max_discount) : Infinity;
            discountAmount = Math.min(pctDiscount, maxCap);
          } else {
            discountAmount = parseFloat(promo.discount_value);
          }

          discountAmount = Math.min(discountAmount, originalPrice);
          appliedPromo = cleanCode;
        }
      }
    }

    const finalPrice = parseFloat(Math.max(0, originalPrice - discountAmount).toFixed(2));

    return {
      baseFee,
      perKmRate,
      originalPrice,
      discountAmount: parseFloat(discountAmount.toFixed(2)),
      totalPrice: finalPrice,
      appliedPromo,
    };
  }

  private toRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }
}
