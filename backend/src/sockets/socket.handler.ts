import { Server, Socket } from 'socket.io';
import { privateChatHandler } from './private.socket';

export const socketHandler = (io: Server) => {
	io.on('connection', (socket: Socket) => {
		// console.log(`User connected: ${socket.id}`);
		privateChatHandler(io, socket);
	});
};
