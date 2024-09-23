import { Routes } from "@angular/router";

export const adminRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('../../../../features/user-management/user-management.component').then(m => m.UserManagementComponent),
    title: 'User Management - Admin',
    data: { breadcrumbs: 'User Management' }
  }
]
