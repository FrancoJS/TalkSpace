import { Request, Response } from 'express';
import { UserService } from '../services/user.service/user.service';
import { UploadedFile } from 'express-fileupload';
import { cloudinary } from '../config/cloudinaryConfig';
import { userNameValidator } from '../validators/user.validator';

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
				user,
			});
		} catch (error) {
			return res.status(500).json({ ok: false, message: 'Error al obtener el usuario' });
		}
	}

	static async updateUsername(req: Request, res: Response) {
		try {
			const { userId } = req?.params;
			const { username } = req?.body;
			const error = userNameValidator.validate({ username });

			if (error.error) return res.status(400).json({ ok: false, message: error.error.details[0].message });
			if (!userId) return res.status(400).json({ ok: false, message: 'No se proporciono el id del usuario ' });
			if (!username) return res.status(400).json({ ok: false, message: 'No se proporciono nombre de usuario' });

			const user = await UserService.updateUsername(userId, username);
			console.log(user);
			if (!user) return res.status(404).json({ ok: false, message: 'No se encontro el usuario' });

			return res.status(200).json({ ok: true, message: 'Nombre de usuario actualizado', user });
		} catch (error) {
			return res.status(500).json({ ok: false, message: 'Error al actualizar el nombre de usuario' });
		}
	}

	static async uploadProfileImage(req: Request, res: Response) {
		try {
			const { userId } = req.params;
			if (!userId) return res.status(400).json({ ok: false, message: 'No se proporciono el id del usuario' });
			if (!req.files) return res.status(400).json({ ok: false, message: 'No se proporciono ninguna imagen' });
			const image = req.files?.image as UploadedFile;

			const result = await cloudinary.uploader.upload(image.tempFilePath, {
				folder: 'profiles-pictures',
				transformation: {
					width: 400,
					height: 400,
					quality: 'auto:best',
					crop: 'fill',
					aspect_ratio: '1:1',
					fetch_format: 'auto',
				},
			});

			if (!result) return res.status(500).json({ ok: false, message: 'Error al subir la imagen' });

			await UserService.updateProfilePictureUrl(userId, result.secure_url);

			return res.status(200).json({ ok: true, message: 'Imagen subida', url: result.secure_url });
		} catch (error) {
			return res.status(500).json({ ok: false, message: 'Error al subir la imagen' });
		}
	}
}

export { UserController };
