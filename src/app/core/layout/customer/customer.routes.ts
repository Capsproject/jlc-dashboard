import { Routes } from '@angular/router';

export const customerRoutees: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('../../../features/job-order/job-order.component').then(
        (m) => m.JobOrderComponent
      ),
    title: 'Home - Customer',
    data: { breadcrumbs: 'Home' },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'customer',
  },
];
