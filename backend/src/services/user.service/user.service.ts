import { User } from '../../models/user.model';
import { IRegisterRequest } from '../../interfaces/auth.interfaces';

class UserService {
	static async getUserByEmail(email: string) {
		return User.findOne({ email });
	}

	static async createUser({ username, email, password }: IRegisterRequest) {
		return new User({ username, email, password }).save();
	}

	static async getUserById(id: string) {
		return User.findById(id);
	}

	static async updateUsername(userId: string, username: string) {
		return User.findByIdAndUpdate(userId, { username }, { new: true });
	}

	static async updateProfilePictureUrl(userId: string, profilePictureUrl: string) {
		return User.findByIdAndUpdate(userId, { profilePictureUrl }, { new: true });
	}
}

export { UserService };
