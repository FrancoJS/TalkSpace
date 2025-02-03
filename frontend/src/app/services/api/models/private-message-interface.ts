export interface IMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  privateChatId: string;
  isRead: boolean;
  createdAt: string;
}

export interface IResponsePrivateMessages {
  ok: boolean;
  message: string;
  messages: IMessage[];
}
