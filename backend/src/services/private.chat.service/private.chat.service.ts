import mongoose, { Schema } from 'mongoose';
import { PrivateChat } from '../../models/private.chat.model';

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
		return PrivateChat.find({
			$or: [{ participant1Id: userId }, { participant2Id: userId }],
		})
			.populate('participant1Id', 'username email')
			.populate('participant2Id', 'username email');
	}
}

// static async getChatsByUserId(userId: string) {
// 	if (!mongoose.Types.ObjectId.isValid(userId)) return null;
// 	return PrivateChat.find({ participant1Id: userId });
// }
export { PrivateChatService };
