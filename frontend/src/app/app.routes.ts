import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { authGuard } from './services/guards/auth.guard';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginPageComponent,
  },
  {
    path: 'auth/register',
    component: RegisterPageComponent,
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat-page/chat-page.component').then((c) => c.ChatPageComponent),
    canActivate: [authGuard],
  },
];
