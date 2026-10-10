import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';

dotenv.config();

const API_BASE = `http://localhost:${process.env.PORT ?? 3000}/api/v1`;

async function runConcurrencyTest() {
  console.log('\n===================================================================');
  console.log('🧪 بدء اختبار التضارب الصارم (Concurrency & Race Condition Test)');
  console.log('===================================================================\n');

  const dataSource = new DataSource({
    type:     'postgres',
    host:     process.env.DB_HOST ?? 'localhost',
    port:     parseInt(process.env.DB_PORT ?? '5432'),
    database: process.env.DB_NAME ?? 'moto_delivery',
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASS ?? 'secret',
    ssl:      process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });

  await dataSource.initialize();
  console.log('✅ تم الاتصال بقاعدة البيانات لتجهيز بيئة الاختبار...');

  // 1. تجهيز عميل وطلب معلق
  const [client] = await dataSource.query(`SELECT id FROM users WHERE role = 'client' LIMIT 1`);
  if (!client) {
    console.error('❌ لم يتم العثور على عميل. يرجى تشغيل npm run seed أولاً');
    process.exit(1);
  }

  const [order] = await dataSource.query(
    `INSERT INTO orders (
       client_id, pickup_address, pickup_lat, pickup_lng, pickup_location,
       dropoff_address, dropoff_lat, dropoff_lng, dropoff_location,
       distance_km, base_price, price_per_km, total_price, status, notes
     ) VALUES (
       $1, 'نقطة اختبار التضارب', 36.75, 3.05, ST_SetSRID(ST_MakePoint(3.05, 36.75), 4326)::geography,
       'نقطة وصول الاختبار', 36.72, 3.18, ST_SetSRID(ST_MakePoint(3.18, 36.72), 4326)::geography,
       3.5, 500, 150, 1025.00, 'pending', 'اختبار Concurrency آلي'
     ) RETURNING id`,
    [client.id],
  );

  console.log(`📦 تم إنشاء طلب جديد معلق برقم: ${order.id}`);

  // 2. تجهيز 5 سائقين متصلين وموثقين
  const passHash = await bcrypt.hash('DriverPass123!', 8);
  const driverTokens: { id: string; name: string; token: string }[] = [];

  for (let i = 1; i <= 5; i++) {
    const phone = `0109999000${i}`;
    let [user] = await dataSource.query(`SELECT id, name FROM users WHERE phone = $1`, [phone]);
    if (!user) {
      [user] = await dataSource.query(
        `INSERT INTO users (name, phone, password, role) VALUES ($1, $2, $3, 'driver') RETURNING id, name`,
        [`سائق تجارب ${i}`, phone, passHash],
      );
    }

    await dataSource.query(
      `INSERT INTO drivers (user_id, vehicle_plate, is_online, is_verified, kyc_status, lat, lng, location)
       VALUES ($1, $2, TRUE, TRUE, 'approved', 36.75, 3.05, ST_SetSRID(ST_MakePoint(3.05, 36.75), 4326)::geography)
       ON CONFLICT (user_id) DO UPDATE SET is_online = TRUE, is_verified = TRUE, kyc_status = 'approved'`,
      [user.id, `TEST-${i}`],
    );

    // تسجيل الدخول والحصول على JWT
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password: 'DriverPass123!' }),
    });
    const loginData = await res.json() as any;
    if (loginData?.data?.access_token) {
      driverTokens.push({ id: user.id, name: user.name, token: loginData.data.access_token });
    }
  }

  console.log(`🏍️  تم تجهيز ${driverTokens.length} سائقين لإرسال طلب القبول في نفس اللحظة...`);
  console.log('⚡ إطلاق 5 طلبات PATCH /orders/:id/accept متزامنة في نفس الميلي ثانية...\n');

  // 3. إطلاق الطلبات الخمسة في نفس اللحظة المتناهية (Exact same millisecond)
  const startTime = Date.now();
  const responses = await Promise.all(
    driverTokens.map((d) =>
      fetch(`${API_BASE}/orders/${order.id}/accept`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${d.token}`,
          'Content-Type': 'application/json',
        },
      }).then(async (res) => ({
        driver: d.name,
        status: res.status,
        body: await res.json(),
      })),
    ),
  );
  const elapsed = Date.now() - startTime;

  // 4. تحليل النتائج
  const successList = responses.filter((r) => r.status === 200);
  const conflictList = responses.filter((r) => r.status === 409);
  const errorList = responses.filter((r) => r.status !== 200 && r.status !== 409);

  console.log('-------------------------------------------------------------------');
  console.log(`⏱️ استغرق الاختبار: ${elapsed} ms`);
  console.log(`🟢 عدد السائقين المقبولين (200 OK):      ${successList.length} (المفروض 1 فقط)`);
  console.log(`🔴 عدد المرفوضين بقفل التضارب (409 Conflict): ${conflictList.length} (المفروض 4)`);
  if (errorList.length > 0) {
    console.log(`⚠️ أخطاء غير متوقعة: ${errorList.length}`);
  }

  // 5. التحقق من قاعدة البيانات
  const [finalOrder] = await dataSource.query(
    `SELECT o.id, o.status, o.driver_id, u.name as driver_name 
     FROM orders o 
     LEFT JOIN users u ON u.id = o.driver_id 
     WHERE o.id = $1`,
    [order.id],
  );

  console.log('-------------------------------------------------------------------');
  console.log(`🏆 السائق الفائز بالطلب في قاعدة البيانات: [${finalOrder?.driver_name}]`);
  console.log(`🔒 حالة الطلب النهائية: ${finalOrder?.status}`);

  if (successList.length === 1 && conflictList.length === 4 && finalOrder.status === 'accepted') {
    console.log('\n===================================================================');
    console.log('🎉 النتيجة: نجاح باهر! الـ Concurrency Lock يعمل بكفاءة 100%!');
    console.log('تم إثبات استحالة قبول طلب واحد من قِبل سائقين في نفس اللحظة.');
    console.log('===================================================================\n');
  } else {
    console.error('❌ فشل الاختبار: حدث خلل في معالجة التضارب!');
  }

  await dataSource.destroy();
}

runConcurrencyTest().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
