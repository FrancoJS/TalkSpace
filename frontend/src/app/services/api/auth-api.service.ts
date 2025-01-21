import { inject, Injectable } from '@angular/core';
import { IApiLoginRequest, IApiLoginResponse } from './models/user-interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IRefreshTokenResponse } from './models/token-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly apiUsersUrl = environment.baseUrl + environment.authUserUrl;
  private readonly apiTokenUrl = environment.baseUrl + environment.authTokenUrl;
  private accessToken!: string;
  loginUser(user: IApiLoginRequest): Observable<IApiLoginResponse> {
    return this._httpClient.post<IApiLoginResponse>(this.apiUsersUrl + '/login', user, { withCredentials: true });
  }

  refreshToken(): Observable<IRefreshTokenResponse> {
    return this._httpClient.get<IRefreshTokenResponse>(this.apiTokenUrl + '/refresh', {
      withCredentials: true,
    });
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessToken() {
    return this.accessToken;
  }
}
