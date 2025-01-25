import { Request, Response } from 'express';
import { UserService } from '../services/user.services/user.service';

const getUserByEmail = async (req: Request, res: Response) => {
	try {
		const { email } = req.params;
		const user = await UserService.getUserByEmail(email);

		if (!user) {
			return res.status(404).json({
				ok: false,
				message: 'No se encontro al usuario',
			});
		}

		return res.status(200).json({
			ok: true,
			message: 'Usuario encontrado',
			user: {
				_id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (error) {}
};

export const UserController = {
	getUserByEmail,
};
