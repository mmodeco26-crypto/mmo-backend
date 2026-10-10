import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

interface DriverLocationPayload {
  orderId?: string;
  driverId: string;
  lat: number;
  lng: number;
  heading?: number;
  speed?: number;
}

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/tracking',
})
export class TrackingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(TrackingGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`🟢 Client connected to WebSocket: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`🔴 Client disconnected from WebSocket: ${client.id}`);
  }

  /**
   * انضمام العميل أو السائق إلى غرفة طلب محددة للاستماع للتحديثات الحية
   * Event: 'join_order' -> payload: { orderId: string }
   */
  @SubscribeMessage('join_order')
  handleJoinOrder(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { orderId: string },
  ) {
    if (!data?.orderId) return;
    const room = `order_${data.orderId}`;
    client.join(room);
    this.logger.log(`Socket ${client.id} joined room: ${room}`);
    return { event: 'joined_room', room };
  }

  /**
   * مغادرة غرفة الطلب
   */
  @SubscribeMessage('leave_order')
  handleLeaveOrder(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { orderId: string },
  ) {
    if (!data?.orderId) return;
    const room = `order_${data.orderId}`;
    client.leave(room);
    this.logger.log(`Socket ${client.id} left room: ${room}`);
  }

  /**
   * بث تحديث إحداثيات السائق لحظة بلحظة للعميل في غرفة الطلب
   * Event: 'driver_location'
   */
  @SubscribeMessage('driver_location')
  handleDriverLocation(
    @ConnectedSocket() _client: Socket,
    @MessageBody() payload: DriverLocationPayload,
  ) {
    return this.broadcastDriverLocation(payload);
  }

  /**
   * دالة عامة لبث موقع السائق (يمكن استدعاؤها عبر WebSocket أو HTTP PATCH)
   */
  broadcastDriverLocation(payload: DriverLocationPayload) {
    const timestamp = new Date().toISOString();
    const locationData = {
      ...payload,
      timestamp,
    };

    if (payload.orderId && this.server) {
      // إرسال للعميل المتابع لهذا الطلب تحديداً
      this.server.to(`order_${payload.orderId}`).emit('driver_moved', locationData);
    }

    if (this.server) {
      // بث عام في الروم العامة للسائقين
      this.server.emit('driver_global_location', locationData);
    }

    return { received: true, timestamp };
  }

  /**
   * دالة برمجية لاستدعائها من OrdersService عند تغيير حالة الطلب
   */
  broadcastOrderStatus(orderId: string, status: string, extraData?: any) {
    const payload = {
      orderId,
      status,
      extra: extraData,
      updatedAt: new Date().toISOString(),
    };
    this.server.to(`order_${orderId}`).emit('order_status_changed', payload);
    this.server.emit('global_order_update', payload);
    this.logger.log(`📡 Broadcasted status change for order ${orderId} -> ${status}`);
  }

  /**
   * دالة لبث إشعار فوري بوجود طلب جديد في محيط السائقين
   */
  broadcastNewPendingOrder(order: any) {
    this.server.emit('new_order_available', {
      orderId: order.id,
      pickup_address: order.pickup_address,
      dropoff_address: order.dropoff_address,
      pickup_lat: order.pickup_lat,
      pickup_lng: order.pickup_lng,
      total_price: order.total_price,
      distance_km: order.distance_km,
      createdAt: order.created_at,
    });
  }
}
