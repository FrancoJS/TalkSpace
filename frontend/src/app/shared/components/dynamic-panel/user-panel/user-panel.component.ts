import { NgClass, NgStyle } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { AuthApiService } from '../../../../services/api/auth/auth-api.service';
import { UserApiService } from '../../../../services/api/user/user-api.service';
import { IUser } from '../../../../services/api/models/user-interfaces';

@Component({
  selector: 'app-user-panel',
  imports: [NgStyle, NgClass],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css',
})
export class UserPanelComponent {
  private _selectedFile!: File;
  private readonly _authApiService = inject(AuthApiService);
  private readonly _userApiService = inject(UserApiService);
  isModalOpen: boolean = false;
  modalX: number = 0;
  modalY: number = 0;
  user: IUser = this._authApiService.getUser();

  uploadImage(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input?.files) return;

    this._userApiService.uploadProfilePicture(this.user._id, input.files[0]).subscribe((response) => {
      console.log(response);
    });
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
}
