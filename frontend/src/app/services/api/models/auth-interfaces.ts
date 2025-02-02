import { IUser } from './user-interfaces';

export interface IApiAuthResponse {
  ok: boolean;
  message: string;
  user: IUser;
  accessToken: string;
}
export interface IApiLoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  username: string;
  email: string;
  password: string;
}
