import { IRegisterRequest } from '../models/interfaces/user.interface';
import { User } from '../models/user.model';

const getUsers = () => User.find();

const getUserByEmail = (email: string) => User.findOne({ email });

const getUserById = (id: string) => User.findById(id);

const createUser = ({ username, email, password }: IRegisterRequest) => new User({ username, email, password }).save();

export const UserService = {
	getUsers,
	getUserByEmail,
	getUserById,
	createUser,
};
