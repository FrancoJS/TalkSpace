import { NgClass, NgStyle } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-user-panel',
  imports: [NgStyle, NgClass],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css',
})
export class UserPanelComponent {
  isModalOpen: boolean = false;
  modalX: number = 0;
  modalY: number = 0;
  private _selectedFile!: File;

  uploadPhoto(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input?.files) {
      console.log(input.files[0]);
    }
  }

  deletePhoto() {
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
