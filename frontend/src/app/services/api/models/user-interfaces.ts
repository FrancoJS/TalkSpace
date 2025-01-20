export interface IApiLoginRequest {
  email: string;
  password: string;
}

export interface IApiLoginResponse {
  ok: boolean;
  message: string;
  user: IUser;
  token: string;
}

interface IUser {
  _id: string;
  username: string;
  email: string;
}
