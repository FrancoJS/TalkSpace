import { Component } from '@angular/core';
import { ChatListComponent } from '../../../pages/chat-page/chat-list/chat-list.component';
// import { UserPanelComponent } from './user-panel/user-panel.component';

@Component({
  selector: 'app-dynamic-panel',
  imports: [ChatListComponent],
  templateUrl: './dynamic-panel.component.html',
  styleUrl: './dynamic-panel.component.css',
})
export class DynamicPanelComponent {}
