import jwt from 'jsonwebtoken';

class JwtService {
	static generateAccessToken(): string {
		return jwt.sign({}, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '2h' });
	}

	static generateRefreshToken(sessionId: string): string {
		return jwt.sign({ sessionId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
	}
}

export { JwtService };
