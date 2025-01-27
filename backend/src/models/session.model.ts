import mongoose, { Schema } from 'mongoose';
import { ISession } from '../interfaces/session.interface';

const SessionSchema = new Schema<ISession>({
	sessionId: {
		type: String,
		required: true,
		unique: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		required: true,
	},
	expiresAt: {
		type: Date,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	ipAddress: String,
	userAgent: String,
});

SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Session = mongoose.model<ISession>('Session', SessionSchema, 'sessions');
