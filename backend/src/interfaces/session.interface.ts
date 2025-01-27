import { Schema, Document, Types } from 'mongoose';

export interface ISession {
	sessionId: string;
	userId: Schema.Types.ObjectId;
	expiresAt: Date;
	createdAt?: Date;
	ipAddress?: string;
	userAgent?: string;
}

// export interface ISession {
// 	sessionId: string;
// 	userId: Schema.Types.ObjectId;
// 	expiresAt: Date;
// 	ipAddress?: string;
// 	userAgent?: string;
// }
