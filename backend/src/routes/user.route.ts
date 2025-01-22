import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

router.get('/find/:email', UserController.getUserByEmail);

export default router;
