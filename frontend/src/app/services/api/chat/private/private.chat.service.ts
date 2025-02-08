import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IResponsePrivateChats } from '../../models/private-chat-interface';

@Injectable({
  providedIn: 'root',
})
export class PrivateChatService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _privateChatUrl = environment.baseUrl + environment.privateChatUrl;

  getPrivateChatsByUserId(userId: string): Observable<IResponsePrivateChats> {
    return this._httpClient.get<IResponsePrivateChats>(`${this._privateChatUrl}/chats/all/${userId}`, {
      withCredentials: true,
    });
  }

  getPrivateChatById(privateChatId: string, userId: string): Observable<IResponsePrivateChats> {
    return this._httpClient.get<IResponsePrivateChats>(`${this._privateChatUrl}/chats/one/${privateChatId}/${userId}`, {
      withCredentials: true,
    });
  }
}
