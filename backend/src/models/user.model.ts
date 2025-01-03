import mongoose, { Schema } from 'mongoose';

import { IUser } from './interfaces/user.interface';

const UserSchemma = new Schema<IUser>({
	username: { type: String, required: true, trim: true },
	email: { type: String, required: true, trim: true, unique: true },
	password: { type: String, required: true, trim: true },
	createdAt: { type: Date, required: true, default: Date.now },
});

export const User = mongoose.model<IUser>('User', UserSchemma, 'users');

// Crear funciones relacionadas con el modelo y exportarlas para poder ocuparlas
const getUsers = () => User.find();
const getUserByEmail = (email: string) => User.findOne({ email });
const getUserById = (id: string) => User.findById(id);

export { getUsers, getUserByEmail, getUserById };
