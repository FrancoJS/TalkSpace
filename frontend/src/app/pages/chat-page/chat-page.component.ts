import { Component } from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { DynamicPanelComponent } from '../../shared/components/dynamic-panel/dynamic-panel.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-chat-page',
  imports: [ChatComponent, DynamicPanelComponent, NavBarComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
})
export class ChatPageComponent {}
