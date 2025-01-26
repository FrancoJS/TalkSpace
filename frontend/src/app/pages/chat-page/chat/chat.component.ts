import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserSharingService } from '../../../services/user-sharing.service';
import { IUser } from '../../../services/api/models/user-interfaces';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../../services/socket/socket.service';
const MATERIAL_MODULES = [MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatInputModule];
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MATERIAL_MODULES, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  private readonly _userSharingService = inject(UserSharingService);
  private readonly _socketService = inject(SocketService);
  user!: IUser;
  chatInput: string = '';

  ngOnInit(): void {
    this._userSharingService.user$.subscribe((user) => {
      if (!user) return;
      this.user = user;
    });
  }

  sendMessage() {
    console.log(this.chatInput);
    this.chatInput = '';
  }
}
