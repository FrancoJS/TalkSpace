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

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [NgClass, SearchDialogComponent],
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
  private user: IUser = this._authApiService.getUser();
  activeChatId!: string;
  privateChats: IPrivateChat[] = [];
  userSelected!: IUser;
  isModalOpen: boolean = false;

  ngOnInit(): void {
    if (this.user._id) {
      this._privateChatService.getPrivateChatsByUserId(this.user._id).subscribe((response) => {
        this.privateChats = response.chats;
      });
    }
    this._modalService.modalUserData$.subscribe((user) => {
      this.userSelected = user;
      if (this.userSelected._id.length > 0) {
        this.privateChats.forEach((chat) => {
          if (this.userSelected._id !== chat.user._id) {
            this.openChat(chat.chatId, this.userSelected);
          } else {
            this.activeChatId = '';
            this._messagesSharingService.setMessages([]);
            this._userSharingService.setUser(this.userSelected);
          }
        });
      }
      console.log(this.userSelected);
    });

    this._modalService.modalState$.subscribe((state) => {
      this.isModalOpen = state;
    });
  }

  openSearchDialog() {
    this._modalService.openModal();
  }

  openChat(privateChatId: string, receiverUser: IUser) {
    this._privateMessageService.getMessagesByPrivateChatId(privateChatId).subscribe((response) => {
      this._userSharingService.setUser(receiverUser);
      this._messagesSharingService.setMessages(response.messages);
      this.activeChatId = privateChatId;
    });
  }
}
