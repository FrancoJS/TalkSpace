import { Request, Response } from 'express';
import { loginValidator, registerValidator } from '../validators/user.validator';
import { PasswordService } from '../services/password.service';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service/user.service';
import { JwtService } from '../services/jwt.service';
import { ILoginRequest, IRegisterRequest } from '../interfaces/auth.interfaces';
import crypto from 'node:crypto';
import { SessionService } from '../services/session.service/session.service';
import { Schema } from 'mongoose';

class AuthController {
	// static async register(req: Request, res: Response): Promise<Response> {
	// 	try {
	// 		const { error } = registerValidator.validate(req.body);
	// 		if (error) return res.status(400).json({ ok: false, message: error.message });

	// 		const { username, email, password }: IRegisterRequest = req.body;

	// 		const userExists = await UserService.getUserByEmail(email);
	// 		if (userExists) return res.status(409).json({ ok: false, message: 'El usuario ya existe' });

	// 		const hashedPassword = await PasswordService.hashPassword(password);
	// 		const user = await UserService.createUser({ username, email, password: hashedPassword });

	// 		const sessionId = crypto.randomUUID();

	// 		const accessToken = JwtService.generateAccessToken();
	// 		const refreshToken = JwtService.generateRefreshToken(sessionId);

	// 		res.cookie('refreshToken', refreshToken, {
	// 			httpOnly: true,
	// 			maxAge: 7 * 24 * 60 * 60 * 1000,
	// 			secure: false,
	// 		});

	// 		return res.status(201).json({
	// 			ok: true,
	// 			message: 'El usuario se registro exitosamente',
	// 			user: {
	// 				_id: user._id,
	// 				username: user.username,
	// 				email: user.email,
	// 			},
	// 			accessToken,
	// 		});
	// 	} catch (error) {
	// 		return res.status(500).json({ ok: false, message: 'Error al registrar el usuario', error });
	// 	}
	// }

	static async login(req: Request, res: Response): Promise<Response> {
		try {
			const { error } = loginValidator.validate(req.body);
			if (error) return res.status(400).json({ ok: false, message: error.message });

			const { email, password }: ILoginRequest = req.body;

			const user = await UserService.getUserByEmail(email);
			if (!user) return res.status(404).json({ ok: false, message: 'Correo o contraseña incorrectos' });

			const isMatch: boolean = await PasswordService.comparePassword(password, user.password);
			if (!isMatch) return res.status(401).json({ ok: false, message: 'Correo o contraseña incorrectos' });

			const sessionId = crypto.randomUUID().toString();

			await SessionService.createSession({
				sessionId,
				userId: user._id as Schema.Types.ObjectId,
				expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias de expiracion
				ipAddress: req.ip,
				userAgent: req.headers['user-agent'],
			});

			const accessToken = JwtService.generateAccessToken();
			const refreshToken = JwtService.generateRefreshToken(sessionId);

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				maxAge: 7 * 24 * 60 * 60 * 1000,
				secure: false,
			});

			return res.status(200).json({
				ok: true,
				message: 'Inicio de sesion exitoso',
				user: {
					_id: user._id,
					username: user.username,
					email: user.email,
				},
				accessToken,
			});
		} catch (error) {
			return res.status(500).json({ ok: false, message: 'Error al registrar el usuario', error });
		}
	}

	static async refreshToken(req: Request, res: Response): Promise<Response> {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ ok: false, message: 'No se proporciono token de actualizacion' });
		}

		try {
			const refreshTokenPayload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { sessionId: string };
			const session = await SessionService.getSession(refreshTokenPayload.sessionId);

			// Verificar sesion
			if (!session) return res.status(401).json({ ok: false, message: 'Sesion invalida' });

			// Verificar expiracion
			if (session.expiresAt < new Date()) {
				await SessionService.deleteSession(refreshTokenPayload.sessionId);
				return res.status(401).json({ ok: false, message: 'Sesion expirada' });
			}

			const user = await UserService.getUserById(session.userId.toString());
			if (!user) return res.status(401).json({ ok: false, message: 'Usuario no encontrado' });

			const accessToken = JwtService.generateAccessToken();
			return res.status(200).json({
				ok: true,
				message: 'Token actualizado',
				user: {
					_id: user._id,
					username: user.username,
					email: user.email,
				},
				accessToken,
			});
		} catch (error) {
			return res.status(401).json({ ok: false, message: 'Token invalido' });
		}
	}
}

export { AuthController };
