import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from '../../services/api/auth/auth-api.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordValidator } from '../../shared/validators/password-validator';
import { EmailValidator } from '../../shared/validators/email-validator';
import { IRegisterRequest } from '../../services/api/models/auth-interfaces';
import { HomeNavBarComponent } from '../../shared/components/home-nav-bar/home-nav-bar.component';
import { HomeFooterComponent } from '../../shared/components/home-footer/home-footer.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HomeNavBarComponent, HomeFooterComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authApiService = inject(AuthApiService);
  private readonly _router = inject(Router);
  isRegisterFailed: boolean = false;

  form = this._formBuilder.group(
    {
      username: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      email: ['', [Validators.required, EmailValidator.emailValidator, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      // confirmPassword: ['', Validators.required],
    },
    // {
    //   validators: [PasswordValidator.crossPasswordValidator],
    // },
  );

  registerUser() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // const { confirmPassword, ...user } = this.form.value;
    this._authApiService.registerUser(this.form.value as IRegisterRequest).subscribe({
      next: (response) => {
        const { accessToken, user } = response;
        console.log(user);
        this._authApiService.setAccessToken(accessToken);
        this._authApiService.setUser(user);
        this._router.navigate(['/chat']);
      },
      error: () => {
        this.isRegisterFailed = true;
      },
    });
  }

  get usernameField(): FormControl {
    return this.form.controls.username;
  }
  get emailField(): FormControl {
    return this.form.controls.email;
  }
  get passwordField(): FormControl {
    return this.form.controls.password;
  }
  // get confirmPasswordField(): FormControl {
  //   return this.form.controls.confirmPassword;
  // }
}
