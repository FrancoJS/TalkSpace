import { Document } from 'mongoose';
export interface IUser extends Document {
	username: string;
	email: string;
	password: string;
	createdAt: Date;
}

export interface IRegisterRequest {
	username: string;
	email: string;
	password: string;
}

export interface ILoginRequest {
	email: string;
	password: string;
}
