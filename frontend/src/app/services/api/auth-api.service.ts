import { inject, Injectable } from '@angular/core';
import { IApiLoginRequest, IApiLoginResponse } from './models/user-interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly apiUsersUrl = environment.baseUrl + environment.authUser;
  loginUser(user: IApiLoginRequest): Observable<IApiLoginResponse> {
    return this._httpClient.post<IApiLoginResponse>(this.apiUsersUrl + '/login', user);
  }
}
