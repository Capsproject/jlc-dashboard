import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  }
];
