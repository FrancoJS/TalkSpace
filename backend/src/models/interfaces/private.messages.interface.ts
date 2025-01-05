import mongoose from 'mongoose';

export interface IPrivateMessage {
	senderId: mongoose.Schema.Types.ObjectId;
	receiverId: mongoose.Schema.Types.ObjectId;
	message: string;
	privateChatId: mongoose.Schema.Types.ObjectId;
	createdAt: Date;
}
