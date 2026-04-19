const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDb() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'kkfa_db'}\`;`);
  console.log('Database created or already exists.');
  await connection.end();
}

initDb().catch(err => {
  console.error('Error creating database:', err);
  process.exit(1);
});
