import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IUser } from '../models/user-interfaces';
import { IRefreshTokenResponse } from '../models/token-interface';
import { IApiAuthResponse, IApiLoginRequest, IRegisterRequest } from '../models/auth-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiAuthUrl = environment.baseUrl + environment.authUrl;
  private accessToken!: string;
  private user!: IUser;
  loginUser(user: IApiLoginRequest): Observable<IApiAuthResponse> {
    return this._httpClient.post<IApiAuthResponse>(this._apiAuthUrl + '/user/login', user, { withCredentials: true });
  }

  registerUser(user: IRegisterRequest): Observable<IApiAuthResponse> {
    return this._httpClient.post<IApiAuthResponse>(this._apiAuthUrl + '/user/register', user, {
      withCredentials: true,
    });
  }

  logout(): Observable<{ ok: boolean; message: string }> {
    return this._httpClient.post<{ ok: boolean; message: string }>(
      this._apiAuthUrl + '/user/logout',
      {},
      { withCredentials: true },
    );
  }

  refreshToken(): Observable<IRefreshTokenResponse> {
    return this._httpClient.get<IRefreshTokenResponse>(this._apiAuthUrl + '/token/refresh', {
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
