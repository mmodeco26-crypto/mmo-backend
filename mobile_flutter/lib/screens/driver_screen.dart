import 'dart:async';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import '../core/api_service.dart';
import '../core/socket_service.dart';

class DriverScreen extends StatefulWidget {
  final String driverUserId;
  const DriverScreen({Key? key, required this.driverUserId}) : super(key: key);

  @override
  State<DriverScreen> createState() => _DriverScreenState();
}

class _DriverScreenState extends State<DriverScreen> {
  bool _isOnline = true;
  double _walletBalance = 0.0;
  List<dynamic> _nearbyOrders = [];
  Map<String, dynamic>? _activeOrder;
  StreamSubscription<Position>? _positionStream;

  @override
  void initState() {
    super.initState();
    _loadWalletAndOrders();
    _startLocationTracking();

    SocketService.initSocket(
      onNewOrderAvailable: (data) {
        if (mounted) {
          _loadNearbyOrders();
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('🔔 يوجد طلب جديد بالقرب منك!')),
          );
        }
      },
    );
  }

  void _loadWalletAndOrders() async {
    try {
      final wallet = await ApiService.getWallet();
      setState(() {
        _walletBalance = double.tryParse(wallet['balance'].toString()) ?? 0.0;
      });
      _loadNearbyOrders();
    } catch (e) {
      print('Error loading wallet: $e');
    }
  }

  void _loadNearbyOrders() async {
    try {
      final orders = await ApiService.getNearbyOrders(radius: 15);
      setState(() {
        _nearbyOrders = orders;
      });
    } catch (e) {
      print('Error loading orders: $e');
    }
  }

  // بث إحداثيات السائق الحية عبر GPS للباك إند
  void _startLocationTracking() async {
    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
    }

    _positionStream = Geolocator.getPositionStream(
      locationSettings: const LocationSettings(
        accuracy: LocationAccuracy.high,
        distanceFilter: 10, // تحديث كل 10 أمتار
      ),
    ).listen((Position pos) {
      SocketService.emitDriverLocation(
        orderId: _activeOrder?['id'],
        driverId: widget.driverUserId,
        lat: pos.latitude,
        lng: pos.longitude,
      );
    });
  }

  void _acceptOrder(String orderId) async {
    try {
      final order = await ApiService.acceptOrder(orderId);
      setState(() {
        _activeOrder = order;
      });
      SocketService.joinOrderRoom(orderId);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('✅ تم قبول الطلب بنجاح!')),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('❌ $e'), backgroundColor: Colors.red),
      );
    }
  }

  void _updateStatus(String nextStatus) async {
    if (_activeOrder == null) return;
    try {
      final updated = await ApiService.updateOrderStatus(_activeOrder!['id'], nextStatus);
      setState(() {
        if (nextStatus == 'delivered') {
          _activeOrder = null;
          _loadWalletAndOrders(); // إعادة تحميل الرصيد بعد خصم الـ 15% عمولة
        } else {
          _activeOrder = updated;
        }
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('تم التحديث إلى: $nextStatus')),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('❌ $e'), backgroundColor: Colors.red),
      );
    }
  }

  @override
  void dispose() {
    _positionStream?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('🏍️ واجهة السائق'),
        backgroundColor: Colors.blueGrey.shade900,
        actions: [
          Center(
            child: Padding(
              padding: const EdgeInsets.only(right: 16.0),
              child: Text(
                'المحفظة: $_walletBalance DZD',
                style: TextStyle(
                  color: _walletBalance < 0 ? Colors.redAccent : Colors.lightGreenAccent,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // مفتاح الاتصال
            SwitchListTile(
              title: const Text('حالة الاستقبال (Online)'),
              value: _isOnline,
              onChanged: (val) => setState(() => _isOnline = val),
              activeColor: Colors.green,
            ),
            const Divider(),

            // إذا كان هناك طلب نشط
            if (_activeOrder != null) ...[
              Card(
                color: Colors.amber.shade50,
                elevation: 4,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    children: [
                      Text('📦 طلب نشط: ${_activeOrder!['pickup_address']}'),
                      Text('المبلغ المطلوب من الزبون: ${_activeOrder!['total_price']} DZD',
                          style: const TextStyle(fontWeight: FontWeight.bold)),
                      const SizedBox(height: 12),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          ElevatedButton(
                            onPressed: () => _updateStatus('picked_up'),
                            child: const Text('استلمت الطرد'),
                          ),
                          ElevatedButton(
                            onPressed: () => _updateStatus('in_transit'),
                            child: const Text('في الطريق'),
                          ),
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
                            onPressed: () => _updateStatus('delivered'),
                            child: const Text('تم التسليم (كاش)'),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ] else ...[
              // قائمة الطلبات القريبة
              const Align(
                alignment: Alignment.centerRight,
                child: Text('الطلبات القريبة المتاحة:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              ),
              const SizedBox(height: 8),
              Expanded(
                child: _nearbyOrders.isEmpty
                    ? const Center(child: Text('لا توجد طلبات معلقة قريبة حالياً'))
                    : ListView.builder(
                        itemCount: _nearbyOrders.length,
                        itemBuilder: (ctx, i) {
                          final o = _nearbyOrders[i];
                          return Card(
                            margin: const EdgeInsets.symmetric(vertical: 6),
                            child: ListTile(
                              leading: const Icon(Icons.delivery_dining, color: Colors.blue),
                              title: Text(o['pickup_address'] ?? 'نقطة الانطلاق'),
                              subtitle: Text('${o['distance_km']} كم — ${o['total_price']} DZD'),
                              trailing: ElevatedButton(
                                style: ElevatedButton.styleFrom(backgroundColor: Colors.amber.shade800),
                                onPressed: () => _acceptOrder(o['id']),
                                child: const Text('قبول'),
                              ),
                            ),
                          );
                        },
                      ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
