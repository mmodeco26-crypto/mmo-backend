import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

async function runMigrations() {
  console.log('🔄 جاري تنفيذ الـ Migrations مباشرة عبر اتصال Node.js...');

  const dataSource = new DataSource({
    type:     'postgres',
    host:     process.env.DB_HOST ?? 'localhost',
    port:     parseInt(process.env.DB_PORT ?? '5432'),
    database: process.env.DB_NAME ?? 'moto_delivery',
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASS ?? 'secret',
    ssl:      process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });

  try {
    await dataSource.initialize();
    console.log('✅ تم الاتصال بقاعدة البيانات بنجاح.');

    const migrationsDir = path.resolve(process.cwd(), 'migrations');
    const migrationFiles = [
      '001_create_extensions.sql',
      '002_create_users_table.sql',
      '003_create_drivers_table.sql',
      '004_create_orders_table.sql',
      '005_wallets_reviews_admin.sql',
      '006_otp_verification.sql',
      '007_add_suspended_status.sql',
    ];

    for (const file of migrationFiles) {
      const filePath = path.join(migrationsDir, file);
      if (fs.existsSync(filePath)) {
        console.log(`⏳ جاري تنفيذ: ${file}...`);
        const sql = fs.readFileSync(filePath, 'utf-8');
        await dataSource.query(sql);
        console.log(`✅ تم تنفيذ: ${file}`);
      } else {
        console.warn(`⚠️ لم يتم العثور على الملف: ${file}`);
      }
    }

    console.log('\n🎉 اكتملت جميع الـ Migrations بنجاح!');
  } catch (err: any) {
    console.error('❌ خطأ أثناء تنفيذ الـ Migrations:', err.message);
    process.exit(1);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

runMigrations();
