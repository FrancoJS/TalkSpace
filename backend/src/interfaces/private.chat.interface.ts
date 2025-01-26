import mongoose from 'mongoose';

export interface IPrivateChat {
	participant1Id: mongoose.Schema.Types.ObjectId;
	participant2Id: mongoose.Schema.Types.ObjectId;
	createdAt: Date;
}
