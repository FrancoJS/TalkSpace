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

export interface IApiGetUser {
  ok: boolean;
  message: string;
  user: IUser;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
}
