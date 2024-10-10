import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: 'job-orders',
    loadComponent: () => import('../../../../features/job-order/job-order.component').then((m) => m.JobOrderComponent),
    title: 'User Management - Admin',
    data: { breadcrumbs: 'User Management', role: ['admin', 'owner'] },
  },
];
