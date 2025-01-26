import mongoose from 'mongoose';

export interface IPrivateMessageModel {
	senderId: mongoose.Schema.Types.ObjectId;
	receiverId: mongoose.Schema.Types.ObjectId;
	message: string;
	privateChatId: mongoose.Schema.Types.ObjectId;
	isDelivered: boolean;
	createdAt: Date;
}

export interface IPrivateMessage {
	senderId: string;
	receiverId: string;
	message: string;
	privateChatId?: string;
	isDelivered?: boolean;
}
