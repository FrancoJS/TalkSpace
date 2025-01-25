import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent {
  private _dialog = inject(MatDialog);

  openSearchDialog() {
    const dialogRef = this._dialog.open(SearchDialogComponent, {
      panelClass: 'my-panel',
    });
  }
}
