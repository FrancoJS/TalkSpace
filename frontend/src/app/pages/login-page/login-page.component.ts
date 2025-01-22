import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { IApiLoginRequest } from '../../services/api/models/user-interfaces';
import { SocketService } from '../../services/socket/socket.service';
import { Router } from '@angular/router';
import { AuthApiService } from '../../services/api/auth/auth-api.service';

const MATERIAL_MODULES = [MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule];

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [MATERIAL_MODULES, ReactiveFormsModule, NgIf],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private readonly __formBuilder = inject(FormBuilder);
  private readonly __authApiService = inject(AuthApiService);
  private readonly __socketService = inject(SocketService);
  private readonly __router = inject(Router);

  form = this.__formBuilder.group({
    email: ['franco@gmail.com', [Validators.email, Validators.required, Validators.maxLength(100)]],
    password: ['12345678', [Validators.required, Validators.minLength(8)]],
  });

  loginUser() {
    if (this.form.valid) {
      this.__authApiService.loginUser(this.form.value as IApiLoginRequest).subscribe({
        next: (response) => {
          const { user, accessToken } = response;
          const { _id } = user;
          console.log(response);
          this.__authApiService.setAccessToken(accessToken);
          this.__socketService.connect(_id);
          this.__router.navigate(['/chat']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  get emailField() {
    return this.form.controls.email;
  }

  get passwordField() {
    return this.form.controls.password;
  }
}
