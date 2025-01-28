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

const MATERIAL_MODULES = [MatIconModule, MatDividerModule, MatListModule];
@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [MATERIAL_MODULES],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent implements OnInit {
  private _dialog = inject(MatDialog);
  private _userSharingService = inject(UserSharingService);
  private readonly _privateChatService = inject(PrivateChatService);
  private readonly _authApiService = inject(AuthApiService);
  private user: IUser = this._authApiService.getUser();
  privateChats: IUser[] = [];

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
          this._userSharingService.setUser(receiverUser);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
