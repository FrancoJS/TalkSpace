import { Server, Socket } from 'socket.io';
import { PrivateChatService } from '../services/private.chat.services/private.chat.service';
import { IPrivateMessage } from '../models/interfaces/private.message.interface';
import mongoose from 'mongoose';
import { usersMap } from './socket.handler';
import { PrivateMessageService } from '../services/private.chat.services/private.message.service';

export const privateChatHandler = (io: Server, socket: Socket) => {
	socket.on('privateMessage', async (data: IPrivateMessage) => {
		try {
			const { senderId, receiverId, message } = data;
			if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
				throw new Error('senderId o receiverId invalidos');
			}
			const privateChat = await PrivateChatService.getPrivateChatByParticipantsIds(senderId, receiverId);
			let privateChatId: string;

			if (privateChat) {
				privateChatId = privateChat._id.toString();
			} else {
				const newPrivateChat = await PrivateChatService.createPrivateChat(senderId, receiverId);
				privateChatId = newPrivateChat._id.toString();
			}

			if (!socket.rooms.has(privateChatId)) {
				socket.join(privateChatId);
			}

			const receiverSocketId = usersMap.get(receiverId);
			console.log(receiverSocketId);

			if (receiverSocketId) {
				io.to(receiverSocketId).emit('joinPrivateChat', {
					privateChatId,
				});
			}

			await PrivateMessageService.createMessage({
				...data,
				privateChatId,
				isDelivered: receiverSocketId ? true : false,
			});

			io.to(privateChatId).emit('privateMessage', {
				message,
			});
		} catch (error) {
			console.log(error);
		}
	});

	socket.on('joinPrivateChat', async (data: { privateChatId: string }) => {
		try {
			const { privateChatId } = data;
			if (!socket.rooms.has(privateChatId)) {
				socket.join(privateChatId);
			}
		} catch (error) {
			console.log(error);
		}
	});
};
