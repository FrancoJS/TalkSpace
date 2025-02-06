import { Request, Response } from 'express';
import { UserService } from '../services/user.service/user.service';
import { UploadedFile } from 'express-fileupload';

import { cloudinary } from '../config/cloudinaryConfig';

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

	static async uploadImage(req: Request, res: Response) {
		try {
			const { userId } = req.params;
			if (!userId) return res.status(400).json({ ok: false, message: 'No se proporciono el id del usuario' });
			if (!req.files) return res.status(400).json({ ok: false, message: 'No se proporciono ninguna imagen' });
			const image = req.files?.image as UploadedFile;

			const result = await cloudinary.uploader.upload(image.tempFilePath, {
				transformation: {
					width: 250,
					height: 250,
					crop: 'fill',
					radius: 'max',
					aspect_ratio: '1:1',
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
