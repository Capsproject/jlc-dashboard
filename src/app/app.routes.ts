import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthService } from './core/auth/services/auth.service';
import { map } from 'rxjs';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./core/auth/pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    title: 'Register - JLC Service Center',
  },
  {
    path: 'auth',
    loadComponent: () => import('./core/auth/auth.component').then(m => m.AuthComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./core/auth/auth.routes').then(m => m.authRoutes),
      }
    ]
  },
  {
    path: 'customer',
    loadComponent: ()  => import('./core/layout/customer/customer.component').then(m => m.CustomerComponent),
    // canActivate: [() => inject(AuthService).isAuthenticated.pipe(map(isAuth => isAuth))],
    children: [
      {
        path: '',
        loadChildren: () => import('./core/layout/customer/customer.routes').then(m => m.customerRoutees),
      }
    ],
    data: {
      breadcrumbs :  'Customer',
    }
  },
  {
    path: 'admin',
    loadComponent: () => import('./core/layout/admin/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [() => inject(AuthService).isAuthenticated.pipe(map(isAuth => isAuth))],
    children: [
      {
        path: '',
        loadChildren: () => import('./core/layout/admin/admin/admin.routes').then(m => m.adminRoutes),
      }
    ]
  },
  {
    path: 'home',
    loadComponent: () => import('./core/layout/home/home/home.component').then(m => m.HomeComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./core/layout/home/home.routes').then(m => m.homeRoutes),
      }
    ]
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
