import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketService {
  static IO.Socket? _socket;
  static const String socketUrl = 'http://10.0.2.2:3000/tracking';

  static void initSocket({
    Function(dynamic)? onDriverMoved,
    Function(dynamic)? onOrderStatusChanged,
    Function(dynamic)? onNewOrderAvailable,
  }) {
    if (_socket != null && _socket!.connected) return;

    _socket = IO.io(socketUrl, IO.OptionBuilder()
        .setTransports(['websocket'])
        .enableAutoConnect()
        .build());

    _socket!.onConnect((_) {
      print('🟢 Connected to Tracking WebSocket Gateway');
    });

    _socket!.onDisconnect((_) {
      print('🔴 Disconnected from WebSocket Gateway');
    });

    if (onDriverMoved != null) {
      _socket!.on('driver_moved', onDriverMoved);
    }

    if (onOrderStatusChanged != null) {
      _socket!.on('order_status_changed', onOrderStatusChanged);
    }

    if (onNewOrderAvailable != null) {
      _socket!.on('new_order_available', onNewOrderAvailable);
    }
  }

  // انضمام العميل أو السائق لغرفة الطلب
  static void joinOrderRoom(String orderId) {
    _socket?.emit('join_order', {'orderId': orderId});
  }

  // مغادرة غرفة الطلب
  static void leaveOrderRoom(String orderId) {
    _socket?.emit('leave_order', {'orderId': orderId});
  }

  // إرسال موقع السائق لحظياً
  static void emitDriverLocation({
    String? orderId,
    required String driverId,
    required double lat,
    required double lng,
  }) {
    _socket?.emit('driver_location', {
      if (orderId != null) 'orderId': orderId,
      'driverId': driverId,
      'lat': lat,
      'lng': lng,
    });
  }

  static void disconnect() {
    _socket?.disconnect();
    _socket = null;
  }
}
