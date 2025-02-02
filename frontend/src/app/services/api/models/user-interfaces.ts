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
