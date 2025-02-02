import { Component, inject, OnInit } from '@angular/core';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { UserSharingService } from '../../../services/user-sharing.service';
import { IUser } from '../../../services/api/models/user-interfaces';
import { PrivateChatService } from '../../../services/api/chat/private/private.chat.service';
import { AuthApiService } from '../../../services/api/auth/auth-api.service';
import { IPrivateChat } from '../../../services/api/models/private-chat-interface';
import { PrivateMessageService } from '../../../services/api/chat/private/private-message.service';
import { MessagesSharingService } from '../../../services/messages-sharing.service';
import { NgClass } from '@angular/common';
import { ModalService } from '../../../services/modal.service';
import { ChatSharingService } from '../../../services/chat-sharing.service';

@Component({
  selector: 'app-chat-list',
  imports: [NgClass, SearchDialogComponent],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent implements OnInit {
  private readonly _userSharingService = inject(UserSharingService);
  private readonly _messagesSharingService = inject(MessagesSharingService);
  private readonly _chatSharingService = inject(ChatSharingService);
  private readonly _privateChatService = inject(PrivateChatService);
  private readonly _authApiService = inject(AuthApiService);
  private readonly _privateMessageService = inject(PrivateMessageService);
  private readonly _modalService = inject(ModalService);
  private user: IUser = this._authApiService.getUser();
  activeChatId!: string;
  privateChats: IPrivateChat[] = [];
  userSelected!: IUser;
  isModalOpen: boolean = false;

  ngOnInit(): void {
    this._privateChatService.getPrivateChatsByUserId(this.user._id).subscribe((response) => {
      this.privateChats = response.chats;
      console.log(this.privateChats);
    });

    this._modalService.modalUserData$.subscribe((user) => {
      this.userSelected = user;
      if (this.userSelected._id.length < 0) return;

      const chat: IPrivateChat | undefined = this.privateChats.find((chat) => chat.user._id === this.userSelected._id);

      if (chat) {
        this.openChat(chat.chatId, this.userSelected);
        return;
      }
      // Si no se encuentra el chat, se limpian los mensajes
      this._messagesSharingService.setMessages([]);
      this._userSharingService.setUser(this.userSelected);
      this.activeChatId = '';
    });

    this._modalService.modalState$.subscribe((state) => {
      this.isModalOpen = state;
    });

    // Refresca el orden de los chats, poniendo el que tenga el ultimo mensaje como el primero
    this._chatSharingService.refreshChat$.subscribe((refresh) => {
      if (!refresh) return;

      if (this.privateChats[0].chatId !== this.activeChatId) {
        const index = this.privateChats.findIndex((chat) => chat.chatId === this.activeChatId);
        const [chat] = this.privateChats.splice(index, 1);

        this.privateChats.unshift(chat);
      }
    });
  }

  openSearchDialog() {
    this._modalService.openModal();
  }

  openChat(privateChatId: string, receiverUser: IUser) {
    this._privateMessageService.getMessagesByPrivateChatId(privateChatId).subscribe((response) => {
      this.activeChatId = privateChatId;
      this._userSharingService.setUser(receiverUser);
      this._messagesSharingService.setMessages(response.messages);
    });
  }
}
