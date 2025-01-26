import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IApiLoginRequest, IApiLoginResponse, IUser } from '../models/user-interfaces';
import { IRefreshTokenResponse } from '../models/token-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly apiAuthUrl = environment.baseUrl + environment.authUrl;
  private accessToken!: string;
  private user!: IUser;
  loginUser(user: IApiLoginRequest): Observable<IApiLoginResponse> {
    return this._httpClient.post<IApiLoginResponse>(this.apiAuthUrl + '/user/login', user, { withCredentials: true });
  }

  refreshToken(): Observable<IRefreshTokenResponse> {
    return this._httpClient.get<IRefreshTokenResponse>(this.apiAuthUrl + '/token/refresh', {
      withCredentials: true,
    });
  }

  setUser(user: IUser) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessToken() {
    return this.accessToken;
  }
}
