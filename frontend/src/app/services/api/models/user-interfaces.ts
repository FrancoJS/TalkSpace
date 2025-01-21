export interface IApiLoginRequest {
  email: string;
  password: string;
}

export interface IApiLoginResponse {
  ok: boolean;
  message: string;
  user: IUser;
  accessToken: string;
}

interface IUser {
  _id: string;
  username: string;
  email: string;
}
