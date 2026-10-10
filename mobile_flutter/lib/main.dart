import 'package:flutter/material.dart';
import 'package:latlong2/latlong.dart';
import 'screens/driver_screen.dart';
import 'screens/client_tracking_screen.dart';

void main() {
  runApp(const MotoDeliveryApp());
}

class MotoDeliveryApp extends StatelessWidget {
  const MotoDeliveryApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Moto Delivery',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.amber,
        useMaterial3: true,
      ),
      home: const RoleSelectionScreen(),
    );
  }
}

class RoleSelectionScreen extends StatelessWidget {
  const RoleSelectionScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('🏍️ منصة توصيل الدراجات النارية'),
        centerTitle: true,
        backgroundColor: Colors.amber.shade700,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.two_wheeler, size: 80, color: Colors.amber),
              const SizedBox(height: 24),
              const Text(
                'اختر الواجهة لتجربة المنظومة:',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 32),
              SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton.icon(
                  icon: const Icon(Icons.delivery_dining),
                  label: const Text('واجهة السائق (Driver Mode)', style: TextStyle(fontSize: 18)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blueGrey.shade800,
                    foregroundColor: Colors.white,
                  ),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => const DriverScreen(
                          driverUserId: 'mock-driver-uuid',
                        ),
                      ),
                    );
                  },
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton.icon(
                  icon: const Icon(Icons.person_pin_circle),
                  label: const Text('تتبع العميل المباشر (Client Live Map)', style: TextStyle(fontSize: 18)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.amber.shade800,
                    foregroundColor: Colors.white,
                  ),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => ClientTrackingScreen(
                          orderId: 'mock-order-uuid',
                          pickupLocation: const LatLng(36.7650, 3.0550),
                          dropoffLocation: const LatLng(36.7550, 3.0500),
                          totalPrice: 725.0,
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
