import { Routes } from '@angular/router';

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
    children: [
      {
        path: '',
        loadChildren: () => import('./core/layout/customer/customer.routes').then(m => m.customerRoutees),
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
