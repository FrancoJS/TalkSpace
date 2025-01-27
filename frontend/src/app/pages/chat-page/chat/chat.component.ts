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
import { AuthApiService } from '../../../services/api/auth/auth-api.service';
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
  private readonly authApiService = inject(AuthApiService);
  private readonly _socketService = inject(SocketService);
  user: IUser = this.authApiService.getUser();
  receiverUser!: IUser;
  chatInput: string = '';
  messages: string[] = [];

  ngOnInit(): void {
    // Servicio para compartir datos del usuario que va a recibir el mensaje
    this._socketService.connect(this.user._id);

    this._userSharingService.user$.subscribe((receiverUser) => {
      if (receiverUser) {
        this.receiverUser = receiverUser;
      }
    });

    this._socketService.listen<{ privateChatId: string }>('joinPrivateChat').subscribe((privateChatId) => {
      return this._socketService.emit('joinPrivateChat', privateChatId);
    });

    this._socketService.listen<{ message: string }>('privateMessage').subscribe((data) => {
      this.messages.push(data.message as string);
    });
  }

  sendMessage() {
    this._socketService.emit('privateMessage', {
      senderId: this.user._id,
      receiverId: this.receiverUser._id,
      message: this.chatInput,
    });
    this.chatInput = '';
  }
}
