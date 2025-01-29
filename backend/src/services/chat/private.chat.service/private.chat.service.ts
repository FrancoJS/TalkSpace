import { PrivateChat } from '../../../models/private.chat.model';
import { IPopulatedPrivateChat } from '../../../interfaces/private.chat.interface';

class PrivateChatService {
	static async createPrivateChat(participant1Id: string, participant2Id: string) {
		return new PrivateChat({ participant1Id, participant2Id }).save();
	}

	static async getPrivateChatByParticipantsIds(Id1: string, Id2: string) {
		return PrivateChat.findOne({
			$or: [
				{ participant1Id: Id1, participant2Id: Id2 },
				{ participant1Id: Id2, participant2Id: Id1 },
			],
		});
	}

	static async getChatsByUserId(userId: string) {
		const chats = await PrivateChat.find({
			$or: [{ participant1Id: userId }, { participant2Id: userId }],
		}).populate<IPopulatedPrivateChat[]>('participant1Id participant2Id', '_id username email');

		// Filtra los chats para obtener los datos de los que no son el usuario
		const filteredChats = chats.map((chat) => {
			// Hay que hacer doble conversion ya que no se puede castear directamente
			const populatedChat = chat as unknown as IPopulatedPrivateChat;
			const { participant1Id, participant2Id } = populatedChat;
			const chatInfo = {
				user: {},
				chatId: populatedChat._id,
			};

			chatInfo.user = participant1Id._id.toString() !== userId ? participant1Id : participant2Id;
			return chatInfo;
		});
		return filteredChats;
	}
}

export { PrivateChatService };
