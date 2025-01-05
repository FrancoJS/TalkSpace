import { PrivateChat } from '../../models/private.chat.model';

const createPrivateChat = (participant1: string, participant2: string) =>
	new PrivateChat({ participant1, participant2 }).save();

export const PrivateChatService = {
	createPrivateChat,
};
