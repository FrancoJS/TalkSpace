import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IResponsePrivateMessages } from '../../models/private-message-interface';

@Injectable({
  providedIn: 'root',
})
export class PrivateMessageService {
  private readonly _httpClient = inject(HttpClient);
  private _privateChatUrl = environment.baseUrl + environment.privateChatUrl;
  getMessagesByPrivateChatId(privateChatId: string): Observable<IResponsePrivateMessages> {
    return this._httpClient.get<IResponsePrivateMessages>(`${this._privateChatUrl}/messages/${privateChatId}`);
  }
}
