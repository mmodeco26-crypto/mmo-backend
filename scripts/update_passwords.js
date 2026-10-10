const bcrypt = require('bcryptjs');
const { Client } = require('pg');

async function main() {
  const client = new Client({
    host: 'ep-odd-cell-b4gspowl.c-6.us-east-2.aws.neon.tech',
    port: 5432,
    database: 'neondb',
    user: 'neondb_owner',
    password: 'npg_wNUiuJcPZe94',
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();

  const adminHash = await bcrypt.hash('admin', 10);
  await client.query("UPDATE users SET password = $1 WHERE role = 'admin'", [adminHash]);
  console.log('✅ Admin password updated to bcrypt hash of "admin"');

  const agentHash = await bcrypt.hash('agent', 10);
  await client.query("UPDATE users SET password = $1 WHERE role = 'agent'", [agentHash]);
  console.log('✅ Agent password updated to bcrypt hash of "agent"');

  await client.end();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
