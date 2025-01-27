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
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

export const PrivateChat = mongoose.model<IPrivateChat>('PrivateChat', PrivateChatSchema, 'privatechats');
