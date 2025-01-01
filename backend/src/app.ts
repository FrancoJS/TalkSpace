import 'dotenv/config';
import express, { Application } from 'express';
import morgan from 'morgan';
import connectDB from './database/database.connection';

const app: Application = express();
connectDB();

app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, (): void => {
	console.log('Server running on port 3000');
});
