import { Router } from 'express';
import { PrivateChatController } from '../controllers/private.chat.controller';

const router = Router();

router.get('/chats/:userId', PrivateChatController.getChats);

export default router;
