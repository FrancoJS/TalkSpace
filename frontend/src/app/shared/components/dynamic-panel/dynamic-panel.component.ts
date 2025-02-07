import { Component, inject, OnInit } from '@angular/core';
import { ChatListComponent } from '../../../pages/chat-page/chat-list/chat-list.component';
import { DynamicPanelService } from '../../../services/dynamic-panel.service';
import { UserProfileComponent } from './user-profile/user-profile.component';

@Component({
  selector: 'app-dynamic-panel',
  imports: [ChatListComponent, UserProfileComponent],
  templateUrl: './dynamic-panel.component.html',
  styleUrl: './dynamic-panel.component.css',
})
export class DynamicPanelComponent implements OnInit {
  private readonly _dynamicPanelService = inject(DynamicPanelService);
  selectedComponent = 'Chats';
  ngOnInit(): void {
    this._dynamicPanelService.selectedComponent$.subscribe((component) => {
      this.selectedComponent = component;
    });
  }
}
