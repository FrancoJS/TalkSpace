import { IPrivateMessage } from '../../interfaces/private.message.interface';
import { PrivateMessage } from '../../models/private.message.model';

const createMessage = ({ senderId, receiverId, message, privateChatId, isDelivered = false }: IPrivateMessage) =>
	new PrivateMessage({ senderId, receiverId, message, privateChatId, isDelivered }).save();

const getPendingMessages = (receiverId: string, isDelivered = false) => PrivateMessage.find({ receiverId, isDelivered });

export const PrivateMessageService = {
	createMessage,
};
