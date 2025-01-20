import { Injectable } from '@angular/core';
import { io as Client, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { IPrivateMessage } from '../../shared/models/private-message-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  constructor() {
    this.socket = Client(environment.baseUrl, {
      query: {
        userId: localStorage.getItem('_id'),
      },
    });
  }

  emitPrivateMessage<T>(event: string, data: T) {
    this.socket.emit(event, data);
  }

  listen<T>(event: string) {
    return new Observable((suscriber) => {
      this.socket.on(event, (data: T) => {
        suscriber.next(data);
      });
    });
  }
}
