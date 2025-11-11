import request from 'supertest';
import app from '../../src/app.js';
import Database from '../../src/config/database.js';

describe('Profile API Integration Tests', () => {
  let testProfileId;

  afterAll(async () => {
    await Database.getInstance().getPool().end();
  });

  describe('GET /api/profiles', () => {
    test('debe retornar lista de perfiles con status 200', async () => {
      const response = await request(app).get('/api/profiles');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('profiles');
      expect(Array.isArray(response.body.profiles)).toBe(true);
    });
  });

  describe('POST /api/profile', () => {
    test('debe crear un nuevo perfil con status 201', async () => {
      const timestamp = Date.now();
      const newProfile = {
        username: `integration_${timestamp}`,
        email: `integration_${timestamp}@test.com`,
        bio: 'Integration test profile'
      };

      const response = await request(app)
        .post('/api/profile')
        .send(newProfile);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('profile');
      expect(response.body.profile.username).toBe(newProfile.username);
      
      testProfileId = response.body.profile.id;
    });

    test('debe retornar 400 si falta el username', async () => {
      const response = await request(app)
        .post('/api/profile')
        .send({ email: 'test@test.com' });

      expect(response.status).toBe(400);
    });

    test('debe retornar 400 si el email es inválido', async () => {
      const response = await request(app)
        .post('/api/profile')
        .send({ username: 'test', email: 'invalid-email' });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/profile/:id', () => {
    test('debe retornar un perfil por ID con status 200', async () => {
      const response = await request(app).get('/api/profile/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('profile');
      expect(response.body.profile.id).toBe(1);
    });

    test('debe retornar 404 si el perfil no existe', async () => {
      const response = await request(app).get('/api/profile/999999');

      expect(response.status).toBe(404);
    });

    test('debe retornar 400 si el ID no es válido', async () => {
      const response = await request(app).get('/api/profile/invalid');

      expect(response.status).toBe(400);
    });
  });

  describe('PATCH /api/profile/:id', () => {
    test('debe actualizar un perfil con status 200', async () => {
      const updates = {
        username: 'updated_integration',
        email: 'updated_integration@test.com',
        bio: 'Updated bio'
      };

      const response = await request(app)
        .patch('/api/profile/1')
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('profile');
      expect(response.body.profile.username).toBe(updates.username);
    });

    test('debe retornar 404 si el perfil no existe', async () => {
      const response = await request(app)
        .patch('/api/profile/999999')
        .send({ username: 'test' });

      expect(response.status).toBe(404);
    });

    test('debe retornar 400 si el email es inválido', async () => {
      const response = await request(app)
        .patch('/api/profile/1')
        .send({ email: 'invalid-email' });

      expect(response.status).toBe(400);
    });
  });
});
