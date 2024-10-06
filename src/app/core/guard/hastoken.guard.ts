import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { environment } from '../../../environments/environment.development';

export const hastokenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem(environment.tokenName);
  if (token) {
    router.navigate(['/']);
    return false;
  } else {
    return true;
  }
};
