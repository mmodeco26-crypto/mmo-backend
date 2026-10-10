import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ApiService {
  // استبدل بـ IP جهازك المحلي (مثال: http://192.168.1.5:3000/api/v1) أو 10.0.2.2 لمُحاكي أندرويد
  static const String baseUrl = 'http://10.0.2.2:3000/api/v1';
  static const _storage = FlutterSecureStorage();

  static Future<String?> getToken() async {
    return await _storage.read(key: 'jwt_token');
  }

  static Future<void> saveToken(String token) async {
    await _storage.write(key: 'jwt_token', value: token);
  }

  static Future<Map<String, String>> _headers() async {
    final token = await getToken();
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  // تسجيل الدخول
  static Future<Map<String, dynamic>> login(String phone, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'phone': phone, 'password': password}),
    );
    final data = jsonDecode(response.body);
    if (response.statusCode == 200 && data['data'] != null) {
      await saveToken(data['data']['access_token']);
      return data['data'];
    }
    throw Exception(data['message'] ?? 'فشل تسجيل الدخول');
  }

  // إنشاء طلب (العميل)
  static Future<Map<String, dynamic>> createOrder({
    required String pickupAddress,
    required double pickupLat,
    required double pickupLng,
    required String dropoffAddress,
    required double dropoffLat,
    required double dropoffLng,
    String? notes,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/orders'),
      headers: await _headers(),
      body: jsonEncode({
        'pickup_address': pickupAddress,
        'pickup_lat': pickupLat,
        'pickup_lng': pickupLng,
        'dropoff_address': dropoffAddress,
        'dropoff_lat': dropoffLat,
        'dropoff_lng': dropoffLng,
        'notes': notes,
      }),
    );
    final data = jsonDecode(response.body);
    if (response.statusCode == 201) return data['data'];
    throw Exception(data['message'] ?? 'فشل إنشاء الطلب');
  }

  // جلب الطلبات القريبة (السائق)
  static Future<List<dynamic>> getNearbyOrders({int radius = 10}) async {
    final response = await http.get(
      Uri.parse('$baseUrl/orders/nearby?radius=$radius'),
      headers: await _headers(),
    );
    final data = jsonDecode(response.body);
    if (response.statusCode == 200) return data['data'] ?? [];
    throw Exception(data['message'] ?? 'فشل جلب الطلبات القريبة');
  }

  // قبول الطلب (السائق - محمي بـ Concurrency Lock)
  static Future<Map<String, dynamic>> acceptOrder(String orderId) async {
    final response = await http.patch(
      Uri.parse('$baseUrl/orders/$orderId/accept'),
      headers: await _headers(),
    );
    final data = jsonDecode(response.body);
    if (response.statusCode == 200) return data['data'];
    throw Exception(data['message'] ?? 'فشل قبول الطلب');
  }

  // تحديث حالة الطلب
  static Future<Map<String, dynamic>> updateOrderStatus(String orderId, String status) async {
    final response = await http.patch(
      Uri.parse('$baseUrl/orders/$orderId/status'),
      headers: await _headers(),
      body: jsonEncode({'status': status}),
    );
    final data = jsonDecode(response.body);
    if (response.statusCode == 200) return data['data'];
    throw Exception(data['message'] ?? 'فشل تحديث الحالة');
  }

  // جلب رصيد المحفظة
  static Future<Map<String, dynamic>> getWallet() async {
    final response = await http.get(
      Uri.parse('$baseUrl/wallet/me'),
      headers: await _headers(),
    );
    final data = jsonDecode(response.body);
    if (response.statusCode == 200) return data['data'];
    throw Exception(data['message'] ?? 'فشل جلب المحفظة');
  }
}
