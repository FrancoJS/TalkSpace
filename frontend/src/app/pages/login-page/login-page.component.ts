import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { AuthApiService } from '../../services/api/auth-api.service';
import { IApiLoginRequest } from '../../services/api/models/user-interfaces';

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

  form = this.__formBuilder.group({
    email: ['', [Validators.email, Validators.required, Validators.maxLength(100)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  loginUser() {
    if (this.form.valid) {
      this.__authApiService.loginUser(this.form.value as IApiLoginRequest).subscribe({
        next: (response) => {
          console.log(response);
          const { user } = response;
          const { _id, username, email } = user;
          localStorage.setItem('_id', _id);
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
