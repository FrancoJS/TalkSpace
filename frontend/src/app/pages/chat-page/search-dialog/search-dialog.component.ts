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
  result!: string;

  formGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
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
            catchError((err) => {
              console.log(err);
              return of(null);
            }),
          ),
        ),
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.result = response.user.username;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
