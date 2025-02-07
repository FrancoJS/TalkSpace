import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiUser } from '../models/user-interfaces';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly _httpClient = inject(HttpClient);
  private apiUserUrl = environment.baseUrl + environment.userUrl;

  getUserByEmail(email: string): Observable<IApiUser> {
    return this._httpClient.get<IApiUser>(`${this.apiUserUrl}/find/${email}`, { withCredentials: true });
  }

  updateUsername(userId: string, username: string): Observable<IApiUser> {
    return this._httpClient.patch<IApiUser>(
      `${this.apiUserUrl}/update/username/${userId}`,
      { username },
      { withCredentials: true },
    );
  }

  uploadProfilePicture(userId: string, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this._httpClient.post(`${this.apiUserUrl}/upload-profile-picture/${userId}`, formData, {
      withCredentials: true,
    });
  }
}
