import { Server, Socket } from 'socket.io';
import { PrivateChatService } from '../services/private.chat.services/private.chat.service';

export const privateChatHandler = (io: Server, socket: Socket) => {
	socket.on('joinPrivateChat', async (senderId: string, receiverId: string) => {
		try {
			const privateChat = await PrivateChatService.createPrivateChat(senderId, receiverId);
			const privateChatId = privateChat._id.toString();

			socket.join(privateChatId);
		} catch (error) {
			console.log(error);
		}
	});

	io.on('disconnect', () => {});
};
