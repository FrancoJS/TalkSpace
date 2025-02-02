import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatSharingService {
  refreshChatSource = new BehaviorSubject<boolean>(false);

  refreshChat$ = this.refreshChatSource.asObservable();

  setRefreshChat(value: boolean) {
    this.refreshChatSource.next(value);
  }
}
