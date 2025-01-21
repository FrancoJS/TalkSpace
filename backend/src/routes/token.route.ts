import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { JwtService } from '../services/jwt.service';

const router = Router();

router.get('/refresh', (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	console.log(req.cookies);

	if (!refreshToken) {
		console.log('No se proporciono token de actualizacion');
		return res.status(401).json({ ok: false, message: 'No se proporciono token de actualizacion' });
	}

	try {
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
		const accessToken = JwtService.generateAccessToken();
		return res.status(200).json({ ok: true, message: 'Token actualizado', accessToken });
	} catch (error) {
		console.log(error);
		return res.status(401).json({ ok: false, message: 'Token invalido' });
	}
});

export default router;
