import { IUser } from './user-interfaces';

export interface IPrivateChat {
  user: IUser;
  chatId: string;
}

export interface IResponsePrivateChats {
  ok: boolean;
  message: string;
  chats: IPrivateChat[];
}
