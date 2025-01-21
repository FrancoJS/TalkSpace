import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json({ ok: false, message: 'No se proporciono token ' });
	}

	try {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
		next();
	} catch {
		return res.status(401).json({ ok: false, message: 'Token invalido' });
	}
};
