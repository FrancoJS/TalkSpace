import mongoose, { Schema } from 'mongoose';
import { IPrivateMessage } from './interfaces/private.messages.interface';

const PrivateMessageSchema = new Schema<IPrivateMessage>({
	senderId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
	receiverId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
	message: {
		type: String,
		required: true,
		trim: true,
	},
	privateChatId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'privatechats',
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

export const PrivateMessage = mongoose.model<IPrivateMessage>(
	'PrivateMessage',
	PrivateMessageSchema,
	'privatemessages'
);
