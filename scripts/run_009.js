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
    await dataSource.query("ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'agent';");
    console.log("✅ Successfully added 'agent' to user_role enum");

    // Check if we can seed a sample agent if none exists
    const existing = await dataSource.query("SELECT id FROM users WHERE role = 'agent'");
    if (existing.length === 0) {
      const bcrypt = require('bcryptjs');
      const hash = await bcrypt.hash('Agent123!', 12);
      await dataSource.query(`
        INSERT INTO users (name, phone, email, password, role, is_active)
        VALUES ('سفيان بن علي (Agent Support)', '02000000000', 'agent@mmo.dz', $1, 'agent', true)
        ON CONFLICT (phone) DO NOTHING
      `, [hash]);
      console.log("✅ Seeded sample agent account: phone='02000000000', password='Agent123!'");
    }
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

run();
