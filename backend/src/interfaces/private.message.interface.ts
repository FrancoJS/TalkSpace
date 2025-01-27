import { Schema } from 'mongoose';

export interface IPrivateMessageModel {
	senderId: Schema.Types.ObjectId;
	receiverId: Schema.Types.ObjectId;
	message: string;
	privateChatId: Schema.Types.ObjectId;
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
