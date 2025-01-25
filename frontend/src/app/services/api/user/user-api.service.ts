import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiGetUser } from '../models/user-interfaces';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly __httpClient = inject(HttpClient);
  private apiUserUrl = environment.baseUrl + environment.userUrl;

  getUserByEmail(email: string): Observable<IApiGetUser> {
    return this.__httpClient.get<IApiGetUser>(`${this.apiUserUrl}/find/${email}`);
  }
}
