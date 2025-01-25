import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { UserSharingService } from '../../../services/user-sharing.service';
import { IUser } from '../../../services/api/models/user-interfaces';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent {
  private _dialog = inject(MatDialog);
  private _userSharingService = inject(UserSharingService);

  openSearchDialog() {
    const dialogRef = this._dialog.open(SearchDialogComponent, {
      panelClass: 'my-panel',
    });

    dialogRef.afterClosed().subscribe({
      next: (user: IUser) => {
        this._userSharingService.setUser(user);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
