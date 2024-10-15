import { Routes } from "@angular/router";

export const ownerRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('../../../../features/user-management/user-management.component').then(m => m.UserManagementComponent),
  },
  {
    path: 'users?accountType=technician',
    loadComponent: () => import('../../../../features/user-management/user-management.component').then(m => m.UserManagementComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../../../../features/dashboard/analytics/analytics.component').then(m => m.AnalyticsComponent),
  },
  {
    path: 'calendar',
    loadComponent: () => import('../../../../features/calendar/calendar.component').then(m => m.CalendarPage),
  },
  {
    path: 'job-orders',
    loadComponent: () => import('../../../../features/job-order/job-order.component').then(m => m.JobOrderComponent),
  },
  {
    path: '',
    redirectTo: 'calendar',
    pathMatch: 'full',
  }
]
