import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

router.post('/user/register', AuthController.register);
router.post('/user/login', AuthController.login);

router.get('/token/refresh', AuthController.refreshToken);

export default router;
