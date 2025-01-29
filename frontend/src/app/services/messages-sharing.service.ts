import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMessage } from './api/models/private-message-interface';

@Injectable({
  providedIn: 'root',
})
export class MessagesSharingService {
  private messagesSource = new BehaviorSubject<IMessage[]>([]);

  messages$ = this.messagesSource.asObservable();

  setMessages(messages: IMessage[]) {
    this.messagesSource.next(messages);
  }
}
