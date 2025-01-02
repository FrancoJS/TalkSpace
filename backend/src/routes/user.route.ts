import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

router.post('/register', UserController.registerUser);

export default router;
