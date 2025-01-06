import { Server, Socket } from 'socket.io';
import { PrivateChatService } from '../services/private.chat.services/private.chat.service';

export const privateChatHandler = (io: Server, socket: Socket) => {
	socket.on('privateMessage', async (data) => {
		try {
			const { senderId, receiverId, msg } = data;
			const privateChat = await PrivateChatService.getPrivateChatByParticipantsIds(senderId, receiverId);
			let privateChatId;

			if (privateChat) {
				privateChatId = privateChat._id.toString();
			} else {
				const newPrivateChat = await PrivateChatService.createPrivateChat(senderId, receiverId);
				privateChatId = newPrivateChat._id.toString();
			}

			if (!socket.rooms.has(privateChatId)) {
				socket.join(privateChatId);
			}

			io.to(privateChatId).emit('privateMessageSent', {
				msg,
			});
		} catch (error) {
			console.log(error);
		}
	});

	io.on('disconnect', () => {});
};
