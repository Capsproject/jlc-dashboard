import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../auth/services/auth.service';

export const hastokenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem(environment.tokenName);
  const auth = inject(AuthService);
  if (token) {
    if(auth.userInfo.user_role.name === 'owner') {
      router.navigate(['/owner']);
    } else if (auth.userInfo.user_role.name === 'customer') {
      router.navigate(['/customer']);
    }
    return false;
  } else {
    return true;
  }
};
