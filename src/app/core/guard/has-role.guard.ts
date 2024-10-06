import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { map } from 'rxjs';

export const hasRoleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const userRole = auth.userDetails$.pipe(map((user) => user.user_role.name));
  const isAuthorized = route.data['roles'].includes(userRole);
  console.log(isAuthorized, userRole, route.data['roles']);
  if (!isAuthorized) {
    // Todo Create not Authorized page
    router.navigate(['/']);
  }
  return isAuthorized || false;
};
