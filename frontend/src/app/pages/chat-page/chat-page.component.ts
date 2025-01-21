import { Component, inject, NgModule, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SocketService } from '../../services/socket/socket.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
const MATERIAL_MODULES = [MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatInputModule];
@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [MATERIAL_MODULES, FormsModule, NgFor],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
})
export class ChatPageComponent implements OnInit {
  private readonly __socketService = inject(SocketService);
  input: string = '';
  messages: string[] = [];

  ngOnInit(): void {
    this.__socketService
      .listen<string>('joinPrivateChat')
      .subscribe((privateChatId) => this.__socketService.emit('joinPrivateChat', privateChatId));

    this.__socketService.listen<{ message: string }>('privateMessage').subscribe((data) => {
      this.messages.push(data.message);
      console.log(data);
      console.log(this.messages);
    });
  }

  sendMessage() {
    console.log(this.input);
    this.__socketService.emit('privateMessage', {
      senderId: localStorage.getItem('_id')!,
      receiverId: '678ec756fa93ac53e39ecf72',
      message: this.input,
    });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
