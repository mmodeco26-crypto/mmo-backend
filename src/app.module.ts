import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { OrdersModule } from './modules/orders/orders.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { AdminModule } from './modules/admin/admin.module';
import { OtpModule } from './modules/otp/otp.module';

@Module({
  imports: [
    // 🛡️ حماية ضد هجمات الإغراق (Rate Limiting: 120 طلب في الدقيقة)
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 120,
      },
    ]),

    // ✅ اتصال قاعدة البيانات عبر TypeORM (بدون entities — نستخدم raw SQL)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:     process.env.DB_HOST ?? 'localhost',
      port:     parseInt(process.env.DB_PORT ?? '5432'),
      database: process.env.DB_NAME ?? 'moto_delivery',
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASS ?? 'secret',
      ssl:      process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      entities: [],
      synchronize: false, // ❌ لا نستخدم synchronize — نعتمد على SQL migrations
      logging: process.env.NODE_ENV === 'development',
    }),

    AuthModule,
    DriversModule,
    OrdersModule,
    NotificationsModule,
    TrackingModule,
    WalletModule,
    ReviewsModule,
    AdminModule,
    OtpModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
