import { Component, inject, OnInit } from '@angular/core';
import { AuthApiService } from '../../../services/api/auth/auth-api.service';
import { Router } from '@angular/router';
import { NavBarButtonComponent } from './nav-bar-button/nav-bar-button.component';
import { DynamicPanelService } from '../../../services/dynamic-panel.service';

@Component({
  selector: 'app-nav-bar',
  imports: [NavBarButtonComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  private readonly _authApiService = inject(AuthApiService);
  private readonly _dynamicPanelService = inject(DynamicPanelService);
  private readonly _router = inject(Router);
  selectedComponent: string = 'Chats';

  ngOnInit(): void {
    this._dynamicPanelService.selectedComponent$.subscribe((component) => {
      this.selectedComponent = component;
    });
  }

  logoutUser() {
    this._authApiService.logout().subscribe((response) => {
      if (response.ok) {
        this._authApiService.setAccessToken('');
        this._router.navigate(['/auth/login']);
      }
    });
  }

  showChats() {
    this._dynamicPanelService.setSelectedComponent('Chats');
  }

  showUserProfile() {
    this._dynamicPanelService.setSelectedComponent('UserProfile');
  }

  showConfig() {
    console.log('Configuraciones');
  }
  testClick() {
    console.log('Funciona');
  }
}
