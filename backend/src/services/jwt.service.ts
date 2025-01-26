import jwt from 'jsonwebtoken';

class JwtService {
	static generateAccessToken(): string {
		return jwt.sign({}, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '2h' });
	}

	static generateRefreshToken(): string {
		return jwt.sign({}, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
	}
}

export { JwtService };
