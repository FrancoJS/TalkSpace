import 'dotenv/config';
import express, { Application } from 'express';
import http from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDB from './database/database.connection';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import privateChatRouter from './routes/private.chat.route';
import { socketHandler } from './sockets/socket.handler';

const app: Application = express();
export const server = http.createServer(app);

app.use(cookieParser());
app.use(
	cors({
		origin: process.env.FRONT_URL,
		credentials: true,
	})
);

export const io = new Server(server, {
	cors: {
		origin: process.env.FRONT_URL,
		credentials: true,
	},
});

connectDB();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth/', authRouter);
app.use('/api/user/', userRouter);
app.use('/api/user/private/', privateChatRouter);

socketHandler(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log('Server running on port 3000');
});
