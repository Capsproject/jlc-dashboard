import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthService } from './core/auth/services/auth.service';
import { map } from 'rxjs';
import { hastokenGuard } from './core/guard/hastoken.guard';
import { isAuthenticatedGuard } from './core/guard/isAuthenticated.guard';
import { hasRoleGuard } from './core/guard/has-role.guard';

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
    loadComponent: () =>
      import('./core/auth/auth.component').then((m) => m.AuthComponent),
    canActivate: [hastokenGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./core/auth/auth.routes').then((m) => m.authRoutes),
      },
    ],
  },
  {
    path: 'owner',
    loadComponent: () =>
      import('./core/layout/owner/owner/owner.component').then(
        (m) => m.OwnerComponent
      ),
    // canActivate: [hastokenGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./core/layout/owner/owner/owner.routes').then(
            (m) => m.ownerRoutes
          ),
        // canActivate: [hasRoleGuard],
        data: {
          breadcrumbs: 'Owner',
          role: ['owner'],
        },
      },
    ],
  },
  {
    path: 'customer',
    loadComponent: () =>
      import('./core/layout/customer/customer.component').then(
        (m) => m.CustomerComponent
      ),
    canActivate: [isAuthenticatedGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./core/layout/customer/customer.routes').then(
            (m) => m.customerRoutees
          ),
        canActivate: [hasRoleGuard],
        data: {
          breadcrumbs: 'Customer',
          roles: ['customer'],
        },
      },
    ],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./core/layout/admin/admin/admin.component').then(
        (m) => m.AdminComponent
      ),
    canActivate: [isAuthenticatedGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./core/layout/admin/admin/admin.routes').then(
            (m) => m.adminRoutes
          ),
        canActivate: [hasRoleGuard],
        data: {
          breadcrumbs: 'Admin',
          roles: ['admin'],
        },
      },
    ],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./core/layout/home/home/home.component').then(
        (m) => m.HomeComponent
      ),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./core/layout/home/home.routes').then((m) => m.homeRoutes),
      },
    ],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
