import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PricingService } from './pricing.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { TrackingModule } from '../tracking/tracking.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports:     [NotificationsModule, TrackingModule, WalletModule],
  controllers: [OrdersController],
  providers:   [OrdersService, PricingService],
})
export class OrdersModule {}
