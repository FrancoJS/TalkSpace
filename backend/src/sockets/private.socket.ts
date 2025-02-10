import { Server, Socket } from 'socket.io';
import { IPrivateMessage } from '../interfaces/private.message.interface';
import mongoose from 'mongoose';
import { activeUsersPerChat, usersMap } from './socket.handler';
import { PrivateMessageService } from '../services/chat/private.messages.service/private.message.service';
import { PrivateChatService } from '../services/chat/private.chat.service/private.chat.service';

export const privateChatHandler = (io: Server, socket: Socket) => {
	socket.on('privateMessage', async (data: IPrivateMessage) => {
		try {
			const { senderId, receiverId } = data;
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
				socket.emit('newChat');
			}

			const receiverSocketId: string | undefined = usersMap.get(receiverId);

			const isRead = isReceiverUserActive(receiverSocketId, privateChatId);

			const newMessage = await PrivateMessageService.createMessage({
				...data,
				privateChatId,
				isRead,
			});

			if (receiverSocketId) {
				io.to(receiverSocketId).emit('privateMessageNotification', {
					newMessage,
				});
			}

			socket.emit('privateMessageNotification', {
				newMessage,
			});

			await PrivateChatService.updateLastMessageDate(privateChatId);

			io.to(privateChatId).emit('privateMessage', {
				newMessage,
			});
		} catch (error) {
			// TODO: manejar error con un evento hacia el front para mostrar algun mensaje al cliente
			console.log(error);
		}
	});

	socket.on('joinPrivateChat', (data: { privateChatId: string }) => {
		const { privateChatId } = data;
		if (socket.rooms.has(privateChatId)) return;

		activeUsersPerChat.set(socket.id, {
			activeChatId: privateChatId,
		});

		socket.join(privateChatId);
	});

	socket.on('leavePrivateChat', (data: { privateChatId: string }) => {
		const { privateChatId } = data;
		if (!socket.rooms.has(privateChatId)) return;

		socket.leave(privateChatId);
	});
};

function isReceiverUserActive(receiverSocketId: string | undefined, privateChatId: string): boolean {
	if (!receiverSocketId || activeUsersPerChat.size === 0) return false;
	const isReceiverUserActive = activeUsersPerChat.get(receiverSocketId);
	return Boolean(isReceiverUserActive && isReceiverUserActive.activeChatId === privateChatId);
}
