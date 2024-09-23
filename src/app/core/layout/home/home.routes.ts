import { Routes } from "@angular/router";

export const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  }

]
