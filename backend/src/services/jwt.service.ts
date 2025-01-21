import jwt from 'jsonwebtoken';

const generateAccessToken = (): string => {
	return jwt.sign({}, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '2h' });
};

const generateRefreshToken = (): string => {
	return jwt.sign({}, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
};

export const JwtService = {
	generateAccessToken,
	generateRefreshToken,
};
