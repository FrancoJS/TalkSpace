import { Injectable } from '@angular/core';
import { io as Client, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;

  connect(userId: string) {
    this.socket = Client(environment.baseUrl, {
      query: {
        userId,
      },
      withCredentials: true,
    });
  }

  emit<T>(event: string, data: T) {
    this.socket.emit(event, data);
  }

  listen<T>(event: string): Observable<T> {
    return new Observable((suscriber) => {
      this.socket.on(event, (data: T) => {
        suscriber.next(data);
      });
    });
  }
}
