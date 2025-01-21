import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthApiService } from '../api/auth-api.service';
import { IRefreshTokenResponse } from '../api/models/token-interface';

export const authGuard: CanActivateFn = () => {
  const jwtHelper = new JwtHelperService();
  const router = inject(Router);
  const authApiService = inject(AuthApiService);
  const accessToken = authApiService.getAccessToken();

  console.log(accessToken);
  if (!accessToken || jwtHelper.isTokenExpired(accessToken)) {
    authApiService.refreshToken().subscribe({
      next: (response) => {
        authApiService.setAccessToken(response.accessToken);
        console.log(response);
        return true;
      },
      error: (err) => {
        router.navigate(['/auth/login']);
        console.log(err);
        return false;
      },
    });
  }
  return true;
};
