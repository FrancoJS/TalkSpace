import 'dotenv/config';
import express, { Application } from 'express';
import http from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDB from './database/database.connection';
import userRouter from './routes/user.route';
import tokenRouter from './routes/token.route';
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

app.use('/api/auth/users', userRouter);
app.use('/api/auth/token', tokenRouter);

socketHandler(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log('Server running on port 3000');
});
