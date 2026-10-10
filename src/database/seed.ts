import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

async function runSeed() {
  console.log('🌱 Starting Database Seeding for Moto Delivery...');

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
  console.log('✅ Connected to database successfully.');

  const passwordHash = await bcrypt.hash('Password123!', 10);

  // 1. تنظيف البيانات السابقة (اختياري)
  console.log('🧹 Cleaning previous seed data...');
  await dataSource.query(`DELETE FROM orders WHERE notes LIKE '%[TEST_SEED]%'`);
  await dataSource.query(`DELETE FROM users WHERE email LIKE '%@mototest.com'`);

  // 2. إنشاء المشرف (Admin)
  console.log('👤 Creating Admin user...');
  await dataSource.query(
    `INSERT INTO users (name, phone, email, password, role)
     VALUES ($1, $2, $3, $4, 'admin')
     ON CONFLICT (phone) DO UPDATE SET password = $4`,
    ['المدير العام', '01000000000', 'admin@mototest.com', passwordHash],
  );

  // 3. إنشاء العميل (Client)
  console.log('👤 Creating Test Client...');
  const [client] = await dataSource.query(
    `INSERT INTO users (name, phone, email, password, role)
     VALUES ($1, $2, $3, $4, 'client')
     ON CONFLICT (phone) DO UPDATE SET name = $1
     RETURNING id`,
    ['سفيان الزبون', '01011111111', 'client@mototest.com', passwordHash],
  );

  // 4. إنشاء السائقين (Drivers)
  console.log('🏍️  Creating Test Drivers with PostGIS locations...');
  const driversData = [
    {
      name: 'ياسين دراجي (الجزائر الوسطى)',
      phone: '01022222221',
      email: 'driver1@mototest.com',
      plate: '01425-116-16',
      isOnline: true,
      lat: 36.7712, // البريد المركزي
      lng: 3.0588,
    },
    {
      name: 'أمين دليفري (باب الزوار)',
      phone: '01022222222',
      email: 'driver2@mototest.com',
      plate: '08912-119-16',
      isOnline: true,
      lat: 36.7214, // باب الزوار
      lng: 3.1824,
    },
    {
      name: 'كريم توصيل سريع (بئر مراد رايس)',
      phone: '01022222223',
      email: 'driver3@mototest.com',
      plate: '03478-120-16',
      isOnline: false,
      lat: 36.7350,
      lng: 3.0500,
    },
  ];

  const driverUserIds: string[] = [];

  for (const d of driversData) {
    const [user] = await dataSource.query(
      `INSERT INTO users (name, phone, email, password, role)
       VALUES ($1, $2, $3, $4, 'driver')
       ON CONFLICT (phone) DO UPDATE SET name = $1
       RETURNING id`,
      [d.name, d.phone, d.email, passwordHash],
    );

    driverUserIds.push(user.id);

    const kycStatus = d.email === 'driver3@mototest.com' ? 'pending' : 'approved';
    const isVerified = kycStatus === 'approved';

    await dataSource.query(
      `INSERT INTO drivers (user_id, vehicle_plate, is_online, is_verified, kyc_status, lat, lng, location, last_seen_at)
       VALUES (
         $1, $2, $3, $4, $5, $6, $7,
         ST_SetSRID(ST_MakePoint($7, $6), 4326)::geography,
         NOW()
       )
       ON CONFLICT (user_id) DO UPDATE SET
         is_online = $3,
         is_verified = $4,
         kyc_status = $5,
         lat = $6,
         lng = $7,
         location = ST_SetSRID(ST_MakePoint($7, $6), 4326)::geography,
         last_seen_at = NOW()`,
      [user.id, d.plate, d.isOnline, isVerified, kycStatus, d.lat, d.lng],
    );

    // إنشاء المحفظة للسائق
    await dataSource.query(
      `INSERT INTO wallets (user_id, balance, debt_limit, currency)
       VALUES ($1, 0.00, 3000.00, 'DZD')
       ON CONFLICT (user_id) DO NOTHING`,
      [user.id],
    );
  }

  // إنشاء محفظة للعميل أيضاً
  await dataSource.query(
    `INSERT INTO wallets (user_id, balance, debt_limit, currency)
     VALUES ($1, 0.00, 3000.00, 'DZD')
     ON CONFLICT (user_id) DO NOTHING`,
    [client.id],
  );

  // 5. إنشاء طلبات اختبارية (Sample Orders)
  console.log('📦 Creating Sample Orders...');
  // طلب 1: قيد الانتظار (Pending) قرب السائق الأول
  await dataSource.query(
    `INSERT INTO orders (
       client_id, pickup_address, pickup_lat, pickup_lng, pickup_location,
       dropoff_address, dropoff_lat, dropoff_lng, dropoff_location,
       distance_km, base_price, price_per_km, total_price, status, notes
     ) VALUES (
       $1,
       'شارع ديدوش مراد، الجزائر العاصمة',
       36.7650, 3.0550, ST_SetSRID(ST_MakePoint(3.0550, 36.7650), 4326)::geography,
       'ساحة أول ماي، الجزائر العاصمة',
       36.7550, 3.0500, ST_SetSRID(ST_MakePoint(3.0500, 36.7550), 4326)::geography,
       1.50, 500, 150, 725.00,
       'pending',
       'طرد صغير - يرجى التعامل بحذر [TEST_SEED]'
     )`,
    [client.id],
  );

  // طلب 2: تم تسليمه (Delivered)
  const [deliveredOrder] = await dataSource.query(
    `INSERT INTO orders (
       client_id, driver_id, pickup_address, pickup_lat, pickup_lng, pickup_location,
       dropoff_address, dropoff_lat, dropoff_lng, dropoff_location,
       distance_km, base_price, price_per_km, total_price, status, accepted_at, delivered_at, notes
     ) VALUES (
       $1, $2,
       'مركز التجارة العالمي، باب الزوار',
       36.7190, 3.1800, ST_SetSRID(ST_MakePoint(3.1800, 36.7190), 4326)::geography,
       'مطار هواري بومدين الدولي',
       36.6970, 3.2180, ST_SetSRID(ST_MakePoint(3.2180, 36.6970), 4326)::geography,
       5.20, 500, 150, 1280.00,
       'delivered', NOW() - INTERVAL '45 minutes', NOW() - INTERVAL '15 minutes',
       'أوراق ومستندات مهمة [TEST_SEED]'
     )
     RETURNING id`,
    [client.id, driverUserIds[1]],
  );

  // 6. إنشاء تقييم عينة
  console.log('⭐ Creating Sample Review...');
  await dataSource.query(
    `INSERT INTO reviews (order_id, reviewer_id, reviewee_id, rating, comment)
     VALUES ($1, $2, $3, 5, 'توصيل فائق السرعة ومعاملة ممتازة، بارك الله فيك!')
     ON CONFLICT DO NOTHING`,
    [deliveredOrder.id, client.id, driverUserIds[1]],
  );

  console.log('\n======================================================');
  console.log('🎉 Seeding completed successfully!');
  console.log('======================================================');
  console.log('🔑 الحسابات الجاهزة للتجربة (كلمة المرور موحدة: Password123!):');
  console.log('   👤 Admin:   01000000000  (admin@mototest.com)');
  console.log('   🛒 Client:  01011111111  (client@mototest.com)');
  console.log('   🏍️  Driver1: 01022222221  (Online - الجزائر الوسطى)');
  console.log('   🏍️  Driver2: 01022222222  (Online - باب الزوار)');
  console.log('   🏍️  Driver3: 01022222223  (Offline - بئر مراد رايس)');
  console.log('======================================================\n');

  await dataSource.destroy();
}

runSeed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
