import pool from '../config/database.js';

/**
 * ProfileRepository - Data access layer for profiles
 * Uses connection pool directly (no Singleton pattern)
 * Each server instance can have its own repository for horizontal scaling
 */
class ProfileRepository {
  async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM profiles ORDER BY created_at DESC');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching profiles: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM profiles WHERE id = ?', [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error(`Error fetching profile by id: ${error.message}`);
    }
  }

  async create(profileData) {
    try {
      const { username, email, bio } = profileData;
      const [result] = await pool.query(
        'INSERT INTO profiles (username, email, bio) VALUES (?, ?, ?)',
        [username, email, bio]
      );
      return this.getById(result.insertId);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Username or email already exists');
      }
      throw new Error(`Error creating profile: ${error.message}`);
    }
  }

  async update(id, profileData) {
    try {
      const { username, email, bio } = profileData;
      await pool.query(
        'UPDATE profiles SET username = ?, email = ?, bio = ? WHERE id = ?',
        [username, email, bio, id]
      );
      return this.getById(id);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Username or email already exists');
      }
      throw new Error(`Error updating profile: ${error.message}`);
    }
  }
}

export default ProfileRepository;
