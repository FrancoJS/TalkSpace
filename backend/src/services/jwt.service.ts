import jwt from 'jsonwebtoken';

export const generateToken = (): string => {
	return jwt.sign({}, process.env.JWT_SECRET!, { expiresIn: '1d' });
};
