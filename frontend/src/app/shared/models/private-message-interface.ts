export interface IPrivateMessage {
  senderId: string;
  receiverId: string;
  message: string;
  privateChatId?: string;
  isDelivered?: boolean;
}
