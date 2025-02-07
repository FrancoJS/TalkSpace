import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

router.get('/find/:email', UserController.getUserByEmail);
router.post('/upload-profile-picture/:userId', UserController.uploadProfileImage);

export default router;
