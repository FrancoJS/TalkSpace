import mongoose, { Schema } from 'mongoose';
import { IPrivateMessage } from './interfaces/messages.interface';

const PrivateMessageSchema = new Schema<IPrivateMessage>({
	senderEmail: {
		type: String,
		required: true,
	},
	receiverEmail: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
		trim: true,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

const PrivateMessage = mongoose.model<IPrivateMessage>('PrivateMessage', PrivateMessageSchema, 'privatemessages');
