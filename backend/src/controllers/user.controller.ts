import { Request, Response } from 'express';
import { UserService } from '../services/user.service/user.service';

class UserController {
	static async getUserByEmail(req: Request, res: Response): Promise<Response> {
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
		} catch (error) {
			return res.status(500).json({ ok: false, message: 'Error al obtener el usuario' });
		}
	}
}

export { UserController };
