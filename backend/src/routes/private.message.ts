import { Router } from 'express';
import { PrivateMessageController } from '../controllers/private.messages.controller';

const router = Router();

router.get('/:privateChatId', PrivateMessageController.getMessagesByPrivateChatId);

export default router;
