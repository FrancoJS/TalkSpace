import { IUser } from './user-interfaces';

export interface IRefreshTokenResponse {
  ok: boolean;
  message: string;
  user: IUser;
  accessToken: string;
}
