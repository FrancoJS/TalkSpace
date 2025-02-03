import { Component, inject, OnInit } from '@angular/core';
import { UserApiService } from '../../../services/api/user/user-api.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, of, switchMap } from 'rxjs';
import { IUser } from '../../../services/api/models/user-interfaces';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-search-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.css',
})
export class SearchDialogComponent implements OnInit {
  private readonly _userApiService = inject(UserApiService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _modalService = inject(ModalService);

  user: IUser = {
    _id: '',
    username: '',
    email: '',
  };

  hasResult: boolean = true;

  formGroup = this._formBuilder.group({
    email: ['franco2@gmail.com', [Validators.required, Validators.maxLength(100), Validators.email]],
  });

  ngOnInit(): void {
    this.getUserByEmail();
  }
  getUserByEmail(): void {
    this.formGroup.valueChanges
      .pipe(
        debounceTime(700),
        filter(() => this.formGroup.valid),
        distinctUntilChanged(),
        switchMap((value) =>
          this._userApiService.getUserByEmail(value.email as string).pipe(
            catchError(() => {
              this.user = {
                _id: '',
                username: '',
                email: '',
              };
              this.hasResult = false;
              return of(null);
            }),
          ),
        ),
      )
      .subscribe((response) => {
        if (response) {
          this.hasResult = true;
          this.user = response.user;
        }
      });
  }

  sendMessage(): void {
    if (this.user._id) {
      this._modalService.closeModal(this.user);
    }
  }

  closeSearchDialog(): void {
    this._modalService.closeModal();
  }

  get emailField() {
    return this.formGroup.controls.email;
  }
}
