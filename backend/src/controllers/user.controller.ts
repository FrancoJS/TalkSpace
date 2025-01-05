import { Request, Response } from 'express';
import { ILoginRequest, IRegisterRequest } from '../models/interfaces/user.interface';
import { loginValidator, registerValidator } from '../validators/user.validator';
import { comparePassword, hashPassword } from '../services/user.services/password.service';
import { generateToken } from '../services/jwt.service';
import { UserService } from '../services/user.services/user.service';

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
		const token: string = generateToken();

		return res.status(201).json({
			ok: true,
			message: 'El usuario se registro exitosamente',
			user: {
				_id: user._id,
				username: user.username,
				email: user.email,
			},
			token,
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

		const token: string = generateToken();
		return res.status(200).json({
			ok: true,
			message: 'Inicio de sesion exitoso',
			user: {
				_id: user._id,
				username: user.username,
				email: user.email,
			},
			token,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			message: 'Error al registrar el usuario',
			error,
		});
	}
};

export default {
	register,
	login,
};
