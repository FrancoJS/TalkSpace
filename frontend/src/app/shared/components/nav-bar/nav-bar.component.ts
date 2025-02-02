import { Component, inject } from '@angular/core';
import { AuthApiService } from '../../../services/api/auth/auth-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  private readonly _authApiService = inject(AuthApiService);
  private readonly _router = inject(Router);

  logoutUser() {
    this._authApiService.logout().subscribe((response) => {
      if (response.ok) {
        this._authApiService.setAccessToken('');
        this._router.navigate(['/auth/login']);
      }
    });
  }
}
