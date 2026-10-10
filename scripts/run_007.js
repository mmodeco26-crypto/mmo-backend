const { DataSource } = require('typeorm');
require('dotenv').config();

async function run() {
  const dataSource = new DataSource({
    type:     'postgres',
    host:     process.env.DB_HOST,
    port:     parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    ssl:      process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });

  try {
    await dataSource.initialize();
    console.log('Connected to DB');
    await dataSource.query("ALTER TYPE kyc_status_enum ADD VALUE IF NOT EXISTS 'suspended';");
    console.log('✅ Successfully added suspended to kyc_status_enum');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

run();
