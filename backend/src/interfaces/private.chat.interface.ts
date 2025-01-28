import mongoose from 'mongoose';

export interface IPrivateChat {
	participant1Id: mongoose.Schema.Types.ObjectId;
	participant2Id: mongoose.Schema.Types.ObjectId;
	createdAt: Date;
}

export interface IPopulatedPrivateChat {
	_id: string;
	participant1Id: {
		_id: string;
		username: string;
		email: string;
	};
	participant2Id: {
		_id: string;
		username: string;
		email: string;
	};
}
