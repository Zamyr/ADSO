import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  static instance = null;
  pool = null;

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'adso_profiles',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  getPool() {
    return this.pool;
  }

  async testConnection() {
    try {
      const connection = await this.pool.getConnection();
      console.log('Database connected successfully');
      connection.release();
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }
}

export default Database;
