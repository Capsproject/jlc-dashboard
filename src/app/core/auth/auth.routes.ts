import { Routes } from "@angular/router";

export const authRoutes : Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    title: 'Login - JLC Service Center'
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
    title: 'Register - JLC Service Center'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  }
]
