import { ISession } from '../../interfaces/session.interface';
import { Session } from '../../models/session.model';

class SessionService {
	static async createSession({ sessionId, userId, expiresAt, ipAddress, userAgent }: ISession) {
		return new Session({ sessionId, userId, expiresAt, ipAddress, userAgent }).save();
	}

	static async getSession(sessionId: string) {
		return Session.findOne({ sessionId });
	}

	static async deleteSession(sessionId: string) {
		return Session.deleteOne({ sessionId });
	}
}

export { SessionService };
