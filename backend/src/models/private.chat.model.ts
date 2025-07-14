import mongoose, { Schema } from 'mongoose';
import { IPrivateChat } from '../interfaces/private.chat.interface';

const PrivateChatSchema = new Schema<IPrivateChat>({
	participant1Id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	participant2Id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	lastMessage: {
		type: String,
	},
	lastMessageAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

PrivateChatSchema.index({ lastMessageAt: -1 });

export const PrivateChat = mongoose.model<IPrivateChat>('PrivateChat', PrivateChatSchema, 'privatechats');
