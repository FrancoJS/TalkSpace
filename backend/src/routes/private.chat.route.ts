import { Router } from 'express';
import { PrivateChatController } from '../controllers/private.chat.controller';

const router = Router();

router.get('/:userId', PrivateChatController.getChats);

export default router;
