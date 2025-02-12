import { NgClass, NgStyle } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { AuthApiService } from '../../../../services/api/auth/auth-api.service';
import { UserApiService } from '../../../../services/api/user/user-api.service';
import { IUser } from '../../../../services/api/models/user-interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  imports: [NgStyle, NgClass, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  private readonly _authApiService = inject(AuthApiService);
  private readonly _userApiService = inject(UserApiService);
  isModalOpen: boolean = false;
  modalX: number = 0;
  modalY: number = 0;
  user!: IUser;
  inputUsername!: string;
  isFocused: boolean = false;
  maxLenght: number = 30;
  minLenght: number = 3;

  ngOnInit(): void {
    this.user = this._authApiService.getUser();
    this.inputUsername = this.user.username;
  }

  uploadImage(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input?.files) return;

    this._userApiService.uploadProfilePicture(this.user._id, input.files[0]).subscribe((response) => {
      console.log(response);
    });
  }

  resetInput() {
    this.isFocused = false;
    this.inputUsername = this.user.username;
  }

  deleteImage() {
    console.log('Foto eliminada');
  }

  openModal(event: MouseEvent) {
    this.modalX = event.clientX;
    this.modalY = event.clientY;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  @HostListener('document:keydown', ['$event'])
  handledKeyDownEsc(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isModalOpen) {
      this.closeModal();
    }
  }

  updateUsername() {
    if (this.user.username === this.inputUsername) return;
    if (this.inputUsername.length < this.minLenght) {
      this.inputUsername = this.user.username;
      return;
    }
    this._userApiService.updateUsername(this.user._id, this.inputUsername).subscribe({
      next: (response) => {
        this._authApiService.setUser(response.user);
        this.inputUsername = response.user.username;
        this.isFocused = false;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
        this.inputUsername = this.user.username;
      },
    });
  }
}
