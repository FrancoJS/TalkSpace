import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiGetUser } from '../models/user-interfaces';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly _httpClient = inject(HttpClient);
  private apiUserUrl = environment.baseUrl + environment.userUrl;

  getUserByEmail(email: string): Observable<IApiGetUser> {
    return this._httpClient.get<IApiGetUser>(`${this.apiUserUrl}/find/${email}`, { withCredentials: true });
  }

  uploadProfilePicture(userId: string, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this._httpClient.post(`${this.apiUserUrl}/upload-profile-picture/${userId}`, formData, {
      withCredentials: true,
    });
  }
}
