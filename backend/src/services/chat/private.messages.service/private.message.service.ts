import { IPrivateMessage } from '../../../interfaces/private.message.interface';
import { PrivateMessage } from '../../../models/private.message.model';

class PrivateMessageService {
	static async createMessage({ senderId, receiverId, message, privateChatId, isDelivered = false }: IPrivateMessage) {
		return new PrivateMessage({ senderId, receiverId, message, privateChatId, isDelivered }).save();
	}

	static async getMessagesByPrivateChatId(privateChatId: string) {
		return PrivateMessage.find({ privateChatId });
	}

	static async getPendingMessages(receiverId: string, isDelivered = false) {
		return PrivateMessage.find({ receiverId, isDelivered });
	}
}

export { PrivateMessageService };
