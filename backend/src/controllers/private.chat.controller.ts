import { Request, Response } from 'express';
import { PrivateChatService } from '../services/private.chat.service/private.chat.service';
import mongoose from 'mongoose';

class PrivateChatController {
	static async getChats(req: Request, res: Response) {
		try {
			const { userId } = req.params;
			if (!userId) return res.status(400).json({ ok: false, message: 'No se proporciono el id del usuario' });

			const chats = await PrivateChatService.getChatsByUserId(userId);

			if (!chats) return res.status(404).json({ ok: false, message: 'No se encontraron chats' });

			return res.status(200).json({ ok: true, message: 'Chats obtenidos', chats });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ ok: false, message: 'Error al obtener los chats' });
		}
	}
}

export { PrivateChatController };
