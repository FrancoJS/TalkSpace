import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IApiLoginRequest } from '../../services/api/models/user-interfaces';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from '../../services/api/auth/auth-api.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private readonly __formBuilder = inject(FormBuilder);
  private readonly __authApiService = inject(AuthApiService);
  private readonly __router = inject(Router);
  failLogin: boolean = false;

  form = this.__formBuilder.group({
    email: ['', [Validators.email, Validators.required, Validators.maxLength(100)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  loginUser() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.__authApiService.loginUser(this.form.value as IApiLoginRequest).subscribe({
      next: (response) => {
        const { accessToken } = response;
        this.__authApiService.setAccessToken(accessToken);
        this.__authApiService.setUser(response.user);
        this.__router.navigate(['/chat']);
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
