import mongoose, { Schema } from 'mongoose';
import { IPrivateChat } from './interfaces/private.chat.interface';

const PrivateChatSchema = new Schema<IPrivateChat>({
	participant1: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
	participant2: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

export const PrivateChat = mongoose.model<IPrivateChat>('PrivateChat', PrivateChatSchema, 'privatechats');
