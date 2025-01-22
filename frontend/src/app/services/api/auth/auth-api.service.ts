import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IApiLoginRequest, IApiLoginResponse } from '../models/user-interfaces';
import { IRefreshTokenResponse } from '../models/token-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly _httpClient = inject(HttpClient);
  private readonly apiAuthUrl = environment.baseUrl + environment.authUrl;
  private accessToken!: string;
  loginUser(user: IApiLoginRequest): Observable<IApiLoginResponse> {
    return this._httpClient.post<IApiLoginResponse>(this.apiAuthUrl + '/user/login', user, { withCredentials: true });
  }

  refreshToken(): Observable<IRefreshTokenResponse> {
    return this._httpClient.get<IRefreshTokenResponse>(this.apiAuthUrl + '/token/refresh', {
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
