import { IUser } from './user-interfaces';

export interface IPrivateChat {
  _id: string;
  lastMessageAt: string;
  unreadMessagesCount: number;
  receiverUser: IUser;
}

export interface IResponsePrivateChats {
  ok: boolean;
  message: string;
  chats: IPrivateChat[];
}
