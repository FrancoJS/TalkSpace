import { Component } from '@angular/core';
import { ChatListComponent } from '../../../pages/chat-page/chat-list/chat-list.component';
ChatListComponent;

@Component({
  selector: 'app-dynamic-panel',
  standalone: true,
  imports: [ChatListComponent],
  templateUrl: './dynamic-panel.component.html',
  styleUrl: './dynamic-panel.component.css',
})
export class DynamicPanelComponent {}
