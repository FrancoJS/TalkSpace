import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from '../../services/api/auth/auth-api.service';
import { IApiLoginRequest } from '../../services/api/models/auth-interfaces';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authApiService = inject(AuthApiService);
  private readonly _router = inject(Router);
  failLogin: boolean = false;

  form = this._formBuilder.group({
    email: ['', [Validators.email, Validators.required, Validators.maxLength(100)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  loginUser() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this._authApiService.loginUser(this.form.value as IApiLoginRequest).subscribe({
      next: (response) => {
        const { accessToken } = response;
        this._authApiService.setAccessToken(accessToken);
        this._authApiService.setUser(response.user);
        console.log(response.user);
        this._router.navigate(['/chat']);
      },
      error: () => {
        this.failLogin = true;
      },
    });
  }
  get emailField(): FormControl {
    return this.form.controls.email;
  }

  get passwordField(): FormControl {
    return this.form.controls.password;
  }
}
