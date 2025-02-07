import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicPanelService {
  private selectedComponentSource = new BehaviorSubject<string>('Chats');
  selectedComponent$ = this.selectedComponentSource.asObservable();

  setSelectedComponent(component: string) {
    this.selectedComponentSource.next(component);
  }
}
