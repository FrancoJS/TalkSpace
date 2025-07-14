import { PrivateChat } from '../../../models/private.chat.model';
import mongoose from 'mongoose';

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

	static async getChatsByUserId(Id: string) {
		const userId = new mongoose.Types.ObjectId(Id);
		const chats = await PrivateChat.aggregate([
			{
				$match: {
					$or: [{ participant1Id: userId }, { participant2Id: userId }],
				},
			},
			{
				$lookup: {
					from: 'privatemessages',
					localField: '_id',
					foreignField: 'privateChatId',
					as: 'messages',
				},
			},
			{
				$addFields: {
					unreadMessagesCount: {
						$size: {
							$filter: {
								input: '$messages',
								as: 'message',
								cond: {
									$and: [{ $eq: ['$$message.isRead', false] }, { $ne: ['$$message.senderId', userId] }],
								},
							},
						},
					},
				},
			},
			{
				$addFields: {
					receiverUserId: {
						$cond: {
							if: { $eq: ['$participant1Id', userId] },
							then: '$participant2Id',
							else: '$participant1Id',
						},
					},
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: 'receiverUserId',
					foreignField: '_id',
					as: 'receiverUser',
				},
			},
			{
				$addFields: {
					receiverUser: { $arrayElemAt: ['$receiverUser', 0] },
				},
			},
			{
				$sort: { lastMessageAt: -1 },
			},
			{
				$project: {
					messages: 0,
					receiverUserId: 0,
					participant1Id: 0,
					participant2Id: 0,
					createdAt: 0,
					__v: 0,
					'receiverUser.password': 0,
					'receiverUser.createdAt': 0,
					'receiverUser.__v': 0,
				},
			},
		]);

		return chats;
	}

	static async updateLastMessage(chatId: string, lastMessage: string) {
		return PrivateChat.findByIdAndUpdate(chatId, { lastMessage, lastMessageAt: Date.now() }, { new: true });
	}
}

export { PrivateChatService };
