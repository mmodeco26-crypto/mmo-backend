import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import '../core/socket_service.dart';

class ClientTrackingScreen extends StatefulWidget {
  final String orderId;
  final LatLng pickupLocation;
  final LatLng dropoffLocation;
  final double totalPrice;

  const ClientTrackingScreen({
    Key? key,
    required this.orderId,
    required this.pickupLocation,
    required this.dropoffLocation,
    required this.totalPrice,
  }) : super(key: key);

  @override
  State<ClientTrackingScreen> createState() => _ClientTrackingScreenState();
}

class _ClientTrackingScreenState extends State<ClientTrackingScreen> {
  final MapController _mapController = MapController();
  LatLng? _driverLocation;
  String _orderStatus = 'accepted';

  @override
  void initState() {
    super.initState();
    _driverLocation = widget.pickupLocation;

    // تهيئة الـ WebSockets والاستماع لموقع السائق وحالة الطلب
    SocketService.initSocket(
      onDriverMoved: (data) {
        if (mounted && data != null && data['lat'] != null && data['lng'] != null) {
          setState(() {
            _driverLocation = LatLng(
              (data['lat'] as num).toDouble(),
              (data['lng'] as num).toDouble(),
            );
          });
        }
      },
      onOrderStatusChanged: (data) {
        if (mounted && data != null && data['status'] != null) {
          setState(() {
            _orderStatus = data['status'];
          });
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('تحديث حالة الطلب: $_orderStatus')),
          );
        }
      },
    );

    // الانضمام لغرفة الطلب
    SocketService.joinOrderRoom(widget.orderId);
  }

  @override
  void dispose() {
    SocketService.leaveOrderRoom(widget.orderId);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('🏍️ تتبع الطلب المباشر'),
        backgroundColor: Colors.amber.shade800,
      ),
      body: Stack(
        children: [
          // الخريطة الحية
          FlutterMap(
            mapController: _mapController,
            options: MapOptions(
              initialCenter: widget.pickupLocation,
              initialZoom: 14.0,
            ),
            children: [
              TileLayer(
                urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                userAgentPackageName: 'com.motodelivery.app',
              ),
              MarkerLayer(
                markers: [
                  // نقطة الاستلام
                  Marker(
                    point: widget.pickupLocation,
                    width: 40,
                    height: 40,
                    child: const Icon(Icons.location_on, color: Colors.green, size: 40),
                  ),
                  // نقطة التسليم
                  Marker(
                    point: widget.dropoffLocation,
                    width: 40,
                    height: 40,
                    child: const Icon(Icons.flag, color: Colors.red, size: 40),
                  ),
                  // دراجة السائق تتحرك حياً
                  if (_driverLocation != null)
                    Marker(
                      point: _driverLocation!,
                      width: 50,
                      height: 50,
                      child: Container(
                        decoration: BoxDecoration(
                          color: Colors.amber.shade900,
                          shape: BoxShape.circle,
                          boxShadow: const [BoxShadow(color: Colors.black26, blurRadius: 8)],
                        ),
                        child: const Icon(Icons.two_wheeler, color: Colors.white, size: 30),
                      ),
                    ),
                ],
              ),
            ],
          ),

          // بطاقة حالة الطلب السفلية
          Positioned(
            left: 16,
            right: 16,
            bottom: 24,
            child: Card(
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              elevation: 8,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'الحالة: $_orderStatus',
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                        ),
                        Text(
                          '${widget.totalPrice} DZD',
                          style: TextStyle(
                            color: Colors.green.shade800,
                            fontWeight: FontWeight.bold,
                            fontSize: 18,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    LinearProgressIndicator(
                      value: _orderStatus == 'delivered' ? 1.0 : (_orderStatus == 'in_transit' ? 0.7 : 0.4),
                      color: Colors.amber.shade800,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
