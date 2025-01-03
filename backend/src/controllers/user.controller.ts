import { Request, Response } from 'express';
import { getUserByEmail, User } from '../models/user.model';
import { IRegisterRequest } from '../models/interfaces/user.interface';
import { registerValidator } from '../validators/user.validator';

const registerUser = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { error } = registerValidator.validate(req.body);
		if (error)
			return res.status(400).json({
				ok: false,
				message: error.message,
			});

		const { username, email, password }: IRegisterRequest = req.body;

		const userExists = await getUserByEmail(email);
		if (userExists)
			return res.status(409).json({
				ok: false,
				message: 'El usuario ya existe',
			});

		const user = new User({ username, email, password });
		await user.save();

		return res.status(201).json({
			ok: true,
			message: 'El usuario se registro exitosamente',
			user,
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
	registerUser,
};
