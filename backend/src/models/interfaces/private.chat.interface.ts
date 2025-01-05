import mongoose from 'mongoose';

export interface IPrivateChat {
	participant1: mongoose.Schema.Types.ObjectId;
	participant2: mongoose.Schema.Types.ObjectId;
	createdAt: Date;
}
