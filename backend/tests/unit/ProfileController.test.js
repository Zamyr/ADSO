import ProfileController from '../../src/controllers/ProfileController.js';
import ProfileRepository from '../../src/repositories/ProfileRepository.js';
import pool from '../../src/config/database.js';

describe('ProfileController', () => {
  let controller;
  let mockReq;
  let mockRes;
  let statusCode;
  let responseData;

  afterAll(async () => {
    await pool.end();
  });

  beforeEach(() => {
    controller = new ProfileController();
    statusCode = null;
    responseData = null;
    
    mockReq = {
      params: {},
      body: {}
    };
    
    mockRes = {
      status: function(code) {
        statusCode = code;
        return this;
      },
      json: function(data) {
        responseData = data;
        return this;
      }
    };
  });

  describe('getAllProfiles()', () => {
    test('debe retornar todos los perfiles con status 200', async () => {
      await controller.getAllProfiles(mockReq, mockRes);

      expect(statusCode).toBe(200);
      expect(responseData).toHaveProperty('profiles');
      expect(Array.isArray(responseData.profiles)).toBe(true);
    });
  });

  describe('getProfileById()', () => {
    test('debe retornar un perfil por ID con status 200', async () => {
      mockReq.params.id = '1';

      await controller.getProfileById(mockReq, mockRes);

      expect(statusCode).toBe(200);
      expect(responseData).toHaveProperty('profile');
    });

    test('debe retornar 404 si el perfil no existe', async () => {
      mockReq.params.id = '999';

      await controller.getProfileById(mockReq, mockRes);

      expect(statusCode).toBe(404);
      expect(responseData).toEqual({ error: 'Profile not found' });
    });
  });

  describe('createProfile()', () => {
    test('debe crear un perfil con status 201', async () => {
      const timestamp = Date.now();
      mockReq.body = {
        username: `newuser_${timestamp}`,
        email: `newuser_${timestamp}@example.com`,
        bio: 'New user bio'
      };

      await controller.createProfile(mockReq, mockRes);

      expect(statusCode).toBe(201);
      expect(responseData).toHaveProperty('profile');
    });

    test('debe retornar 400 si faltan campos requeridos', async () => {
      mockReq.body = { username: 'test' };

      await controller.createProfile(mockReq, mockRes);

      expect(statusCode).toBe(400);
    });
  });

  describe('updateProfile()', () => {
    test('debe actualizar un perfil con status 200', async () => {
      mockReq.params.id = '1';
      mockReq.body = {
        username: 'updatedname',
        email: 'updated@example.com',
        bio: 'Updated bio'
      };

      await controller.updateProfile(mockReq, mockRes);

      expect(statusCode).toBe(200);
      expect(responseData).toHaveProperty('profile');
    });

    test('debe retornar 404 si el perfil no existe', async () => {
      mockReq.params.id = '999';
      mockReq.body = { username: 'test' };

      await controller.updateProfile(mockReq, mockRes);

      expect(statusCode).toBe(404);
      expect(responseData).toEqual({ error: 'Profile not found' });
    });
  });
});
