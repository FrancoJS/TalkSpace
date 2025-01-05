import 'dotenv/config';
import express, { Application } from 'express';
import http from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './database/database.connection';
import userRouter from './routes/user.route';

const app: Application = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

connectDB();

app.use(
	cors({
		origin: '*',
	})
);
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth/users', userRouter);

// socketHanlder

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log('Server running on port 3000');
});
