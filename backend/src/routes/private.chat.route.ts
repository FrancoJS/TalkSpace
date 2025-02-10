import { Router } from 'express';
import { PrivateChatController } from '../controllers/private.chat.controller';

const router = Router();

router.get('/all/:userId', PrivateChatController.getChatsByUserId);

export default router;
