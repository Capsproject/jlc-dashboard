import { Routes } from '@angular/router';
import { hasRoleGuard } from '../../guard/has-role.guard';

export const customerRoutees: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('../../../features/job-order/job-order.component').then(
        (m) => m.JobOrderComponent
      ),
    title: 'Home - Customer',
    canActivate: [hasRoleGuard],
    data: { breadcrumbs: 'Home', role: ['customer'] },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
