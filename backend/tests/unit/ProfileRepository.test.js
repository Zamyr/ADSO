import Database from '../../src/config/database.js';
import ProfileRepository from '../../src/repositories/ProfileRepository.js';

describe('ProfileRepository', () => {
  let repository;
  let db;

  beforeAll(() => {
    db = Database.getInstance();
    repository = ProfileRepository.getInstance();
  });

  afterAll(async () => {
    await db.getPool().end();
  });

  describe('getAll()', () => {
    test('debe retornar todos los perfiles', async () => {
      const profiles = await repository.getAll();
      
      expect(profiles).toBeInstanceOf(Array);
      expect(profiles.length).toBeGreaterThan(0);
      expect(profiles[0]).toHaveProperty('id');
      expect(profiles[0]).toHaveProperty('username');
      expect(profiles[0]).toHaveProperty('email');
    });
  });

  describe('getById()', () => {
    test('debe retornar un perfil por ID', async () => {
      const profile = await repository.getById(1);
      
      expect(profile).toBeDefined();
      expect(profile).toHaveProperty('id', 1);
      expect(profile).toHaveProperty('username');
      expect(profile).toHaveProperty('email');
    });

    test('debe retornar null si el perfil no existe', async () => {
      const profile = await repository.getById(999);
      
      expect(profile).toBeNull();
    });
  });

  describe('create()', () => {
    test('debe crear un nuevo perfil', async () => {
      const timestamp = Date.now();
      const newProfile = {
        username: `testuser_${timestamp}`,
        email: `test_${timestamp}@example.com`,
        bio: 'Test bio'
      };
      
      const result = await repository.create(newProfile);
      
      expect(result).toHaveProperty('id');
      expect(result.username).toBe(newProfile.username);
      expect(result.email).toBe(newProfile.email);
      expect(result.bio).toBe(newProfile.bio);
    });
  });

  describe('update()', () => {
    test('debe actualizar un perfil existente', async () => {
      const updates = {
        username: 'updateduser',
        email: 'updated@example.com',
        bio: 'Updated bio'
      };
      
      const result = await repository.update(1, updates);
      
      expect(result).toHaveProperty('id', 1);
      expect(result.username).toBe(updates.username);
      expect(result.email).toBe(updates.email);
      expect(result.bio).toBe(updates.bio);
    });

    test('debe retornar null si el perfil no existe', async () => {
      const result = await repository.update(999, { username: 'test' });
      
      expect(result).toBeNull();
    });
  });
});
