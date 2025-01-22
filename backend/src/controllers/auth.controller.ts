import { Request, Response } from 'express';
import { ILoginRequest, IRegisterRequest } from '../models/interfaces/user.interface';
import { loginValidator, registerValidator } from '../validators/user.validator';
import { comparePassword, hashPassword } from '../services/user.services/password.service';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.services/user.service';
import { JwtService } from '../services/jwt.service';

const register = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { error } = registerValidator.validate(req.body);
		if (error)
			return res.status(400).json({
				ok: false,
				message: error.message,
			});

		const { username, email, password }: IRegisterRequest = req.body;

		const userExists = await UserService.getUserByEmail(email);
		if (userExists)
			return res.status(409).json({
				ok: false,
				message: 'El usuario ya existe',
			});

		const hashedPassword: string = await hashPassword(password);
		const user = await UserService.createUser({ username, email, password: hashedPassword });
		const accessToken: string = JwtService.generateAccessToken();
		const refreshToken: string = JwtService.generateRefreshToken();

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
		return res.status(500).json({
			ok: false,
			message: 'Error al registrar el usuario',
			error,
		});
	}
};

const login = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { error } = loginValidator.validate(req.body);
		if (error)
			return res.status(400).json({
				ok: false,
				message: error.message,
			});

		const { email, password }: ILoginRequest = req.body;

		const user = await UserService.getUserByEmail(email);
		if (!user)
			return res.status(404).json({
				ok: false,
				message: 'Correo o contraseña incorrectos',
			});

		const isMatch: boolean = await comparePassword(password, user.password);
		if (!isMatch)
			return res.status(401).json({
				ok: false,
				message: 'Correo o contraseña incorrectos',
			});

		const accessToken: string = JwtService.generateAccessToken();
		const refreshToken: string = JwtService.generateRefreshToken();

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
		return res.status(500).json({
			ok: false,
			message: 'Error al registrar el usuario',
			error,
		});
	}
};

const refreshToken = (req: Request, res: Response) => {
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
};

export default {
	register,
	login,
	refreshToken,
};
