import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { UserSharingService } from '../../../services/user-sharing.service';
import { IUser } from '../../../services/api/models/user-interfaces';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../../services/socket/socket.service';
import { AuthApiService } from '../../../services/api/auth/auth-api.service';
import { MessagesSharingService } from '../../../services/messages-sharing.service';
import { IMessage } from '../../../services/api/models/private-message-interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, DatePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  private readonly _userSharingService = inject(UserSharingService);
  private readonly _messagesSharingService = inject(MessagesSharingService);
  private readonly _authApiService = inject(AuthApiService);
  private readonly _socketService = inject(SocketService);
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  user: IUser = this._authApiService.getUser();
  receiverUser!: IUser;
  chatInput: string = '';
  messages: IMessage[] = [];
  activeChatId!: string;

  ngOnInit(): void {
    // Servicio para compartir datos del usuario que va a recibir el mensaje
    this._socketService.connect(this.user._id);

    this._userSharingService.user$.subscribe({
      next: (user) => (this.receiverUser = user),
      error: () => (this.receiverUser = { _id: '', username: '', email: '' }),
    });

    // Servicio para compartir los mensajes desde el chatList que busca por el id del chat
    this._messagesSharingService.messages$.subscribe((messages) => {
      this.messages = messages;
      this.chatInput = '';
      setTimeout(() => this.scrollToBottom(true), 5);
    });

    this._socketService.listen<{ privateChatId: string }>('joinPrivateChat').subscribe((privateChatId) => {
      return this._socketService.emit('joinPrivateChat', privateChatId);
    });

    this._socketService.listen<{ newMessage: IMessage }>('privateMessage').subscribe((data) => {
      this.messages.push(data.newMessage);
      setTimeout(() => this.scrollToBottom(), 5);
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

  private scrollToBottom(initialLoad: boolean = false) {
    const scrollContainer = this.scrollContainer.nativeElement;

    scrollContainer.style.scrollBehavior = initialLoad ? 'auto' : 'smooth';

    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  }
}
