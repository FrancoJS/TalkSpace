import { Component } from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { DynamicPanelComponent } from '../../shared/components/dynamic-panel/dynamic-panel.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [ChatComponent, DynamicPanelComponent, NavBarComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
})
export class ChatPageComponent {
  // private readonly __socketService = inject(SocketService);
  // private readonly __userSharingService = inject(UserSharingService);
  // input: string = '';
  // messages: string[] = [];
  // user!: IUser;
  // ngOnInit(): void {
  //   this.__userSharingService.user$.subscribe((user) => (this.user = user));
  //   this.__socketService
  //     .listen<string>('joinPrivateChat')
  //     .subscribe((privateChatId) => this.__socketService.emit('joinPrivateChat', privateChatId));
  //   this.__socketService.listen<{ message: string }>('privateMessage').subscribe((data) => {
  //     this.messages.push(data.message);
  //     console.log(data);
  //     console.log(this.messages);
  //   });
  // }
  // sendMessage() {
  //   console.log(this.input);
  //   this.__socketService.emit('privateMessage', {
  //     senderId: localStorage.getItem('_id')!,
  //     receiverId: '678ec756fa93ac53e39ecf72',
  //     message: this.input,
  //   });
  // }
  // trackById(index: number, item: any): number {
  //   return item.id;
  // }
}
