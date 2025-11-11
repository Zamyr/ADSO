import pool, { testConnection } from './src/config/database.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

async function testDatabaseConnection() {
  console.log('Testing database connection...\n');
  console.log('DB Config:', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD ? '***' : 'EMPTY',
    database: process.env.DB_NAME
  });
  
  const connected = await testConnection();
  
  if (connected) {
    console.log('✅ Connection successful');
    
    try {
      const [rows] = await pool.query('SELECT COUNT(*) as count FROM profiles');
      console.log(`✅ Found ${rows[0].count} profiles in database`);
    } catch (error) {
      console.error('❌ Query failed:', error.message);
    }
  } else {
    console.log('❌ Connection failed');
  }
  
  process.exit(0);
}

testDatabaseConnection();
