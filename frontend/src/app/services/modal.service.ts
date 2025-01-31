import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from './api/models/user-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalState = new BehaviorSubject<boolean>(false);
  private modalSource = new BehaviorSubject<IUser>({ _id: '', username: '', email: '' });

  modalState$ = this.modalState.asObservable();
  modalUserData$ = this.modalSource.asObservable();

  openModal() {
    this.modalState.next(true);
  }

  closeModal(user: IUser = { _id: '', username: '', email: '' }) {
    this.modalState.next(false);
    if (user) {
      this.modalSource.next(user);
    }
  }
}
