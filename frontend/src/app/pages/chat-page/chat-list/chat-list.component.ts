import { Component, inject, OnInit } from '@angular/core';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { UserSharingService } from '../../../services/user-sharing.service';
import { IUser } from '../../../services/api/models/user-interfaces';
import { PrivateChatService } from '../../../services/api/chat/private/private.chat.service';
import { AuthApiService } from '../../../services/api/auth/auth-api.service';
import { IPrivateChat } from '../../../services/api/models/private-chat-interface';
import { PrivateMessageService } from '../../../services/api/chat/private/private-message.service';
import { MessagesSharingService } from '../../../services/messages-sharing.service';
import { DatePipe, NgClass } from '@angular/common';
import { ModalService } from '../../../services/modal.service';
import { SocketService } from '../../../services/socket/socket.service';
import { IMessage } from '../../../services/api/models/private-message-interface';

@Component({
  selector: 'app-chat-list',
  imports: [NgClass, SearchDialogComponent, DatePipe],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent implements OnInit {
  private readonly _userSharingService = inject(UserSharingService);
  private readonly _messagesSharingService = inject(MessagesSharingService);
  private readonly _privateChatService = inject(PrivateChatService);
  private readonly _authApiService = inject(AuthApiService);
  private readonly _privateMessageService = inject(PrivateMessageService);
  private readonly _modalService = inject(ModalService);
  private readonly _socketService = inject(SocketService);
  private user: IUser = this._authApiService.getUser();
  activeChatId!: string;
  privateChats: IPrivateChat[] = [];
  userSelected!: IUser;
  isModalOpen: boolean = false;

  ngOnInit(): void {
    this._privateChatService.getPrivateChatsByUserId(this.user._id).subscribe((response) => {
      this.privateChats = response.chats;
    });

    // Cuando se abre el modal de busqueda busca si el usuario se ecuentra en la lista de chats si no es asi se limpian los mensajes y se abre un nuevo chat
    this._modalService.modalUserData$.subscribe((user) => {
      this.userSelected = user;

      if (this.userSelected._id.length <= 0) return;
      const chat: IPrivateChat | undefined = this.privateChats.find(
        (chat) => chat.receiverUser._id === this.userSelected._id,
      );
      if (chat) {
        this.openChat(chat._id, this.userSelected);
        return;
      }

      this._messagesSharingService.setMessages([]);
      this._userSharingService.setUser(this.userSelected);
      this.activeChatId = '';
    });

    this._modalService.modalState$.subscribe((state) => {
      this.isModalOpen = state;
    });

    // this._socketService.emit<string>('activeChat', this.activeChatId);

    this._socketService.listen<{ newMessage: IMessage }>('privateMessage').subscribe((data) => {
      const chatIndex = this._findChatIndex(data.newMessage.privateChatId);
      if (chatIndex < 0) return;

      this.privateChats[chatIndex].lastMessageAt = data.newMessage.createdAt;

      if (data.newMessage.privateChatId !== this.activeChatId) {
        this.privateChats[chatIndex].unreadMessagesCount++;
      }

      if (chatIndex === 0) return;
      this._updateMessagePosition(chatIndex);
    });
  }

  openSearchDialog() {
    this._modalService.openModal();
  }

  openChat(privateChatId: string, receiverUser: IUser) {
    this._privateMessageService.getMessagesByPrivateChatId(privateChatId).subscribe((response) => {
      if (!response.ok) return;
      this.activeChatId = privateChatId;
      console.log(this.activeChatId);
      this._userSharingService.setUser(receiverUser);
      this._messagesSharingService.setMessages(response.messages);
      const chatIndex = this._findChatIndex(privateChatId);
      this.privateChats[chatIndex].unreadMessagesCount = 0;
      this._socketService.emit<{ privateChatId: string }>('joinPrivateChat', { privateChatId });
    });
  }

  private _updateMessagePosition(chatIndex: number) {
    const [chat] = this.privateChats.splice(chatIndex, 1);
    this.privateChats.unshift(chat);
  }

  private _findChatIndex(privateChatId: string) {
    return this.privateChats.findIndex((chat) => chat._id === privateChatId);
  }
}
