import { IPrivateMessage } from '../../../interfaces/private.message.interface';
import { PrivateMessage } from '../../../models/private.message.model';

class PrivateMessageService {
	static async createMessage({ senderId, receiverId, message, privateChatId, isRead = false }: IPrivateMessage) {
		return new PrivateMessage({ senderId, receiverId, message, privateChatId, isRead }).save();
	}

	static async getMessagesByPrivateChatId(privateChatId: string) {
		await this.updateIsReadByPrivateChatId(privateChatId);
		return PrivateMessage.find({ privateChatId });
	}

	static async updateIsReadByPrivateChatId(privateChatId: string) {
		return PrivateMessage.updateMany({ privateChatId }, { isRead: true });
	}
}

export { PrivateMessageService };
