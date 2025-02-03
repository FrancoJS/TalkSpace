import { PrivateMessageService } from '../services/chat/private.messages.service/private.message.service';
import { Request, Response } from 'express';

class PrivateMessageController {
	static async getMessagesByPrivateChatId(req: Request, res: Response): Promise<Response> {
		try {
			const { privateChatId } = req.params;
			const messages = await PrivateMessageService.getMessagesByPrivateChatId(privateChatId);

			if (!messages) return res.status(404).json({ ok: false, message: 'No se encontraron mensajes' });
			return res.status(200).json({ ok: true, message: 'Mensajes obtenidos', messages });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ ok: false, message: 'Error al obtener los mensajes' });
		}
	}
}

export { PrivateMessageController };
