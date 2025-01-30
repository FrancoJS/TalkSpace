import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { UserSharingService } from '../../../services/user-sharing.service';
import { IUser } from '../../../services/api/models/user-interfaces';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { PrivateChatService } from '../../../services/api/chat/private/private.chat.service';
import { AuthApiService } from '../../../services/api/auth/auth-api.service';
import { IPrivateChat } from '../../../services/api/models/private-chat-interface';
import { PrivateMessageService } from '../../../services/api/chat/private/private-message.service';
import { MessagesSharingService } from '../../../services/messages-sharing.service';
import { NgClass } from '@angular/common';

const MATERIAL_MODULES = [MatIconModule, MatDividerModule, MatListModule];
@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [MATERIAL_MODULES, NgClass],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent implements OnInit {
  private _dialog = inject(MatDialog);
  private readonly _userSharingService = inject(UserSharingService);
  private readonly _messagesSharingService = inject(MessagesSharingService);
  private readonly _privateChatService = inject(PrivateChatService);
  private readonly _authApiService = inject(AuthApiService);
  private readonly _privateMessageService = inject(PrivateMessageService);
  private user: IUser = this._authApiService.getUser();
  // isActive!: boolean;
  activeChatId!: string;
  privateChats: IPrivateChat[] = [];
  // receiverUser =

  ngOnInit(): void {
    if (this.user._id) {
      this._privateChatService.getPrivateChatsByUserId(this.user._id).subscribe({
        next: (response) => {
          this.privateChats = response.chats;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  openSearchDialog() {
    const dialogRef = this._dialog.open(SearchDialogComponent, {
      panelClass: 'my-panel',
    });

    dialogRef.afterClosed().subscribe({
      next: (receiverUser: IUser) => {
        if (receiverUser) {
          this.privateChats.forEach((chat) => {
            if (receiverUser._id === chat.user._id) {
              this.openChat(chat.chatId, receiverUser);
              return;
            }
          });
          this._userSharingService.setUser(receiverUser);
          this._messagesSharingService.setMessages([]);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openChat(privateChatId: string, receiverUser: IUser) {
    this._privateMessageService.getMessagesByPrivateChatId(privateChatId).subscribe((response) => {
      this._userSharingService.setUser(receiverUser);
      this._messagesSharingService.setMessages(response.messages);
      this.activeChatId = privateChatId;
    });
  }
}
