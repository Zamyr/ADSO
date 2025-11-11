import { Router } from 'express';
import ProfileController from '../controllers/ProfileController.js';
import { validateProfileCreate, validateProfileUpdate, validateProfileId } from '../middlewares/validators.js';

const router = Router();
const controller = new ProfileController();

// GET /api/profiles - List all profiles
router.get('/profiles', (req, res) => controller.getAllProfiles(req, res));

// GET /api/profile/:id - Get profile by ID
router.get('/profile/:id', validateProfileId, (req, res) => controller.getProfileById(req, res));

// POST /api/profiles - Create new profile (changed from /profile to /profiles per API spec)
router.post('/profiles', validateProfileCreate, (req, res) => controller.createProfile(req, res));

// PATCH /api/profile/:id - Update profile
router.patch('/profile/:id', validateProfileUpdate, (req, res) => controller.updateProfile(req, res));

export default router;
