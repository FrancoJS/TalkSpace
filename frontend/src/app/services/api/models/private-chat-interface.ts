interface IPrivateChat {
  _id: string;
  username: string;
  email: string;
}

export interface IResponsePrivateChats {
  ok: boolean;
  message: string;
  chats: IPrivateChat[];
}
