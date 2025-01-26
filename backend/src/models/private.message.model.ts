import mongoose, { Schema } from 'mongoose';
import { IPrivateMessageModel } from '../interfaces/private.message.interface';

const PrivateMessageSchema = new Schema<IPrivateMessageModel>({
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
	isDelivered: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

export const PrivateMessage = mongoose.model<IPrivateMessageModel>(
	'PrivateMessage',
	PrivateMessageSchema,
	'privatemessages'
);
