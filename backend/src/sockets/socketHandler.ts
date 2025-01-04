import { Server, Socket } from 'socket.io';

const socketHandler = (io: Server) => {
	io.on('connection', (socket: Socket) => {
		console.log(`User connected: ${socket.id}`);
	});
};
