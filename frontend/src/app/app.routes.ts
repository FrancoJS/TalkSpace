import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { authGuard } from './services/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginPageComponent,
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat-page/chat-page.component').then((c) => c.ChatPageComponent),
    canActivate: [authGuard],
  },
];
