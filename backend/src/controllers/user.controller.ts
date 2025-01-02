import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { IRegisterRequest } from '../models/interfaces/user.interface';

const registerUser = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { username, email, password }: IRegisterRequest = req.body;

		if (!username || !email || !password) {
			return res.status(400).json({ ok: false, message: 'Todos los campos son requeridos' });
		}

		const user = new User({ username, email, password });
		await user.save();
		return res.status(201).json({ ok: true, message: 'El usuario se registro exitosamente', user });
	} catch (error) {
		return res.status(500).json({ ok: false, message: 'Error al registrar el usuario', error });
	}
};

export default {
	registerUser,
};
