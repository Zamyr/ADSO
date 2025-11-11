import ProfileRepository from '../repositories/ProfileRepository.js';

class ProfileController {
  constructor() {
    this.repository = ProfileRepository.getInstance();
  }

  async getAllProfiles(req, res) {
    try {
      const profiles = await this.repository.getAll();
      res.status(200).json({ profiles });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProfileById(req, res) {
    try {
      const { id } = req.params;
      const profile = await this.repository.getById(id);

      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      res.status(200).json({ profile });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createProfile(req, res) {
    try {
      const { username, email, bio } = req.body;

      if (!username || !email) {
        return res.status(400).json({ error: 'Username and email are required' });
      }

      const profile = await this.repository.create({ username, email, bio });
      res.status(201).json({ profile });
    } catch (error) {
      if (error.message.includes('already exists')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const { id } = req.params;
      const { username, email, bio } = req.body;

      const profile = await this.repository.update(id, { username, email, bio });

      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      res.status(200).json({ profile });
    } catch (error) {
      if (error.message.includes('already exists')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
}

export default ProfileController;
