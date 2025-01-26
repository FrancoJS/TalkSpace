import { Request, Response } from 'express';
import { loginValidator, registerValidator } from '../validators/user.validator';
import { PasswordService } from '../services/password.service';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service/user.service';
import { JwtService } from '../services/jwt.service';
import { ILoginRequest, IRegisterRequest } from '../interfaces/auth.interfaces';

class AuthController {
	static async register(req: Request, res: Response): Promise<Response> {
		try {
			const { error } = registerValidator.validate(req.body);
			if (error) return res.status(400).json({ ok: false, message: error.message });

			const { username, email, password }: IRegisterRequest = req.body;

			const userExists = await UserService.getUserByEmail(email);
			if (userExists) return res.status(409).json({ ok: false, message: 'El usuario ya existe' });

			const hashedPassword = await PasswordService.hashPassword(password);
			const user = await UserService.createUser({ username, email, password: hashedPassword });
			const accessToken = JwtService.generateAccessToken();
			const refreshToken = JwtService.generateRefreshToken();

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				maxAge: 7 * 24 * 60 * 60 * 1000,
				secure: false,
			});

			return res.status(201).json({
				ok: true,
				message: 'El usuario se registro exitosamente',
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

	static async login(req: Request, res: Response): Promise<Response> {
		try {
			const { error } = loginValidator.validate(req.body);
			if (error) return res.status(400).json({ ok: false, message: error.message });

			const { email, password }: ILoginRequest = req.body;

			const user = await UserService.getUserByEmail(email);
			if (!user) return res.status(404).json({ ok: false, message: 'Correo o contraseña incorrectos' });

			const isMatch: boolean = await PasswordService.comparePassword(password, user.password);
			if (!isMatch) return res.status(401).json({ ok: false, message: 'Correo o contraseña incorrectos' });

			const accessToken = JwtService.generateAccessToken();
			const refreshToken = JwtService.generateRefreshToken();

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

	static refreshToken(req: Request, res: Response): Response {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ ok: false, message: 'No se proporciono token de actualizacion' });
		}

		try {
			jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
			const accessToken = JwtService.generateAccessToken();
			return res.status(200).json({ ok: true, message: 'Token actualizado', accessToken });
		} catch (error) {
			return res.status(401).json({ ok: false, message: 'Token invalido' });
		}
	}
}

export { AuthController };
