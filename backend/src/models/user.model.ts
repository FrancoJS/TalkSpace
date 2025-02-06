import mongoose, { Schema } from 'mongoose';

import { IUser } from '../interfaces/user.interface';

const UserSchemma = new Schema<IUser>({
	username: { type: String, required: true, trim: true },
	email: { type: String, required: true, trim: true, unique: true },
	password: { type: String, required: true, trim: true },
	profilePictureUrl: { type: String, trim: true, default: null },
	createdAt: { type: Date, required: true, default: Date.now },
});

export const User = mongoose.model<IUser>('User', UserSchemma, 'users');
