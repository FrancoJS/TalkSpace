import { Component, inject, OnInit, ɵɵNgOnChangesFeature } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserApiService } from '../../../services/api/user/user-api.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { catchError, debounceTime, distinctUntilChanged, filter, of, switchMap } from 'rxjs';
import { IUser } from '../../../services/api/models/user-interfaces';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatDialogModule,
  MatButtonModule,
  MatCardModule,
];
@Component({
  selector: 'app-search-dialog',
  standalone: true,
  imports: [MATERIAL_MODULES, ReactiveFormsModule],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.css',
})
export class SearchDialogComponent implements OnInit {
  private readonly _userApiService = inject(UserApiService);
  private readonly _formBuilder = inject(FormBuilder);
  user: IUser = {
    _id: '',
    username: '',
    email: '',
  };
  result: boolean = true;

  formGroup = this._formBuilder.group({
    email: ['franco@gmail.com', [Validators.required, Validators.maxLength(100), Validators.email]],
  });

  ngOnInit(): void {
    this.getUserByEmail();
  }
  getUserByEmail() {
    this.formGroup.valueChanges
      .pipe(
        debounceTime(700),
        filter(() => this.formGroup.valid),
        distinctUntilChanged(),
        switchMap((value) =>
          this._userApiService.getUserByEmail(value.email as string).pipe(
            catchError(() => {
              this.user.username = '';
              this.user.email = '';
              this.result = false;
              return of(null);
            }),
          ),
        ),
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.user = response.user;
            console.log(this.user);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  get emailField() {
    return this.formGroup.controls.email;
  }
}
