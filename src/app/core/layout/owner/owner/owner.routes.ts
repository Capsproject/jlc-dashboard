import { Routes } from "@angular/router";

export const ownerRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('../../../../features/user-management/user-management.component').then(m => m.UserManagementComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../../../../features/dashboard/analytics/analytics.component').then(m => m.AnalyticsComponent),
  },
  {
    path: '',
    redirectTo: 'user-management',
    pathMatch: 'full',
  }
]
