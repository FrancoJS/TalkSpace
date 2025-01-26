import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthApiService } from '../api/auth/auth-api.service';
import { catchError, map, Observable, of } from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const jwtHelper = new JwtHelperService();
  const router = inject(Router);
  const authApiService = inject(AuthApiService);
  let accessToken = authApiService.getAccessToken();

  if (!accessToken || jwtHelper.isTokenExpired(accessToken)) {
    return authApiService.refreshToken().pipe(
      map((response) => {
        console.log(response);
        authApiService.setAccessToken(response.accessToken);
        return true;
      }),
      catchError((err) => {
        router.navigate(['/auth/login']);
        return of(false);
      }),
    );
  }

  return of(true);
};
