import Database from '../config/database.js';

class ProfileRepository {
  static instance = null;

  constructor() {
    this.db = Database.getInstance();
  }

  static getInstance() {
    if (!ProfileRepository.instance) {
      ProfileRepository.instance = new ProfileRepository();
    }
    return ProfileRepository.instance;
  }

  async getAll() {
    try {
      const pool = this.db.getPool();
      const [rows] = await pool.query('SELECT * FROM profiles ORDER BY created_at DESC');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching profiles: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      const pool = this.db.getPool();
      const [rows] = await pool.query('SELECT * FROM profiles WHERE id = ?', [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error(`Error fetching profile by id: ${error.message}`);
    }
  }

  async create(profileData) {
    try {
      const pool = this.db.getPool();
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
      const pool = this.db.getPool();
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
