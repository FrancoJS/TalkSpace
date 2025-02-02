import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { chatGuard } from './services/guards/chat.guard';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { authGuard } from './services/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'auth/register',
    component: RegisterPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat-page/chat-page.component').then((c) => c.ChatPageComponent),
    canActivate: [chatGuard],
  },
];
