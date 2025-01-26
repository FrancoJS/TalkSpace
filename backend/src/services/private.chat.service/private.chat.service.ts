import { PrivateChat } from '../../models/private.chat.model';

const createPrivateChat = (participant1Id: string, participant2Id: string) =>
	new PrivateChat({ participant1Id, participant2Id }).save();

const getPrivateChatByParticipantsIds = (Id1: string, Id2: string) =>
	PrivateChat.findOne({
		$or: [
			{ participant1Id: Id1, participant2Id: Id2 },
			{ participant1Id: Id2, participant2Id: Id1 },
		],
	});

export const PrivateChatService = {
	createPrivateChat,
	getPrivateChatByParticipantsIds,
};
