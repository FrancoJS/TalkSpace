import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from './api/models/user-interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserSharingService {
  // Permite compartir datos de un usuario entre componentes, solamente se puede compartir un usuario y va a ser el ultimo valor emitido
  private userSource = new BehaviorSubject<IUser>({ _id: '', username: '', email: '' });
  user$ = this.userSource.asObservable();

  setUser(user: IUser) {
    this.userSource.next(user);
  }
}
