import { Router } from 'express';
import ProfileController from '../controllers/ProfileController.js';
import { validateProfileCreate, validateProfileUpdate, validateProfileId } from '../middlewares/validators.js';

const router = Router();
const controller = new ProfileController();

router.get('/profiles', (req, res) => controller.getAllProfiles(req, res));
router.get('/profile/:id', validateProfileId, (req, res) => controller.getProfileById(req, res));
router.post('/profile', validateProfileCreate, (req, res) => controller.createProfile(req, res));
router.patch('/profile/:id', validateProfileUpdate, (req, res) => controller.updateProfile(req, res));

export default router;
