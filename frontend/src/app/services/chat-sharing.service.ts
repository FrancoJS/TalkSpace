import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatSharingService {
  private lastChatIdSource = new BehaviorSubject<string>('');

  lastChatId$ = this.lastChatIdSource.asObservable();

  setLastChatId(chatId: string) {
    this.lastChatIdSource.next(chatId);
  }
}
