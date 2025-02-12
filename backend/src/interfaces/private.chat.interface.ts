import mongoose from 'mongoose';

export interface IPrivateChat {
	participant1Id: mongoose.Schema.Types.ObjectId;
	participant2Id: mongoose.Schema.Types.ObjectId;
	lastMessage: string;
	lastMessageAt: Date;
	createdAt: Date;
}
