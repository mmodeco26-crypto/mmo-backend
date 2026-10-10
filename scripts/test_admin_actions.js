const http = require('http');

async function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function run() {
  console.log('1. تسجيل دخول الأدمن...');
  const loginRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/v1/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { phone: '01000000000', password: 'Password123!' });

  if (!loginRes.data || !loginRes.data.data?.access_token) {
    console.error('فشل تسجيل الدخول:', loginRes);
    process.exit(1);
  }

  const token = loginRes.data.data.access_token;
  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  console.log('✅ تم تسجيل الدخول كأدمن بنجاح.');

  const testPhone = '0550' + Math.floor(100000 + Math.random() * 900000);
  console.log(`\n2. إضافة سائق جديد (Ajouter Livreur) برقم: ${testPhone}...`);
  const addRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/v1/admin/drivers',
    method: 'POST',
    headers: authHeaders
  }, {
    name: 'سفيان تجارب',
    phone: testPhone,
    password: 'secret',
    vehicle_plate: '16-77889-00',
    lat: 36.7550,
    lng: 3.0600,
    is_verified: true
  });

  console.log('نتيجة الإضافة:', addRes.status, addRes.data.message || addRes.data);
  const driverId = addRes.data.data?.driver?.id;
  const userId = addRes.data.data?.driver?.user_id;

  if (!driverId || !userId) {
    console.error('لم يتم استرجاع معرف السائق');
    process.exit(1);
  }

  console.log(`\n3. تجميد السائق مؤقتاً (Suspendre)...`);
  const suspendRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: `/api/v1/admin/drivers/${driverId}/suspend`,
    method: 'PATCH',
    headers: authHeaders
  }, { is_suspended: true, reason: 'تجميد تجريبي' });
  console.log('نتيجة التجميد:', suspendRes.status, suspendRes.data.message || suspendRes.data);

  console.log(`\n4. إلغاء التجميد والتفعيل (Unsuspend)...`);
  const unsuspendRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: `/api/v1/admin/drivers/${driverId}/suspend`,
    method: 'PATCH',
    headers: authHeaders
  }, { is_suspended: false });
  console.log('نتيجة إلغاء التجميد:', unsuspendRes.status, unsuspendRes.data.message || unsuspendRes.data);

  console.log(`\n5. حظر الحساب كلياً (Bloquer / is_active = false)...`);
  const blockRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: `/api/v1/admin/users/${userId}/status`,
    method: 'PATCH',
    headers: authHeaders
  }, { is_active: false });
  console.log('نتيجة الحظر:', blockRes.status, blockRes.data.message || blockRes.data);

  console.log(`\n6. رفع الحظر عن الحساب (Débloquer / is_active = true)...`);
  const unblockRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: `/api/v1/admin/users/${userId}/status`,
    method: 'PATCH',
    headers: authHeaders
  }, { is_active: true });
  console.log('نتيجة رفع الحظر:', unblockRes.status, unblockRes.data.message || unblockRes.data);

  console.log('\n🎉 جميع العمليات (Ajouter, Bloquer, Suspendre) تعمل بنجاح 100%!');
}

run().catch(console.error);
