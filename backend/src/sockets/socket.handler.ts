import { Server, Socket } from 'socket.io';
import { privateChatHandler } from './private.socket';
import { ActiveUsersPerChat } from '../interfaces/types/socket.types';

export const usersMap = new Map<string, string>();

export const activeUsersPerChat = new Map<string, ActiveUsersPerChat>();
export const socketHandler = (io: Server) => {
	io.on('connection', (socket: Socket) => {
		console.log(`Usuario conectado: ${socket.id}`);
		const userId = socket.handshake.query.userId as string;
		usersMap.set(userId, socket.id);
		console.log(usersMap);
		privateChatHandler(io, socket);

		socket.on('disconnect', () => {
			console.log(`User disconnected: ${socket.id}`);
			activeUsersPerChat.delete(socket.id);
			usersMap.delete(userId);
		});
	});

	io.on('disconnect', () => {
		console.log('Servidor desconectado');
	});
};
