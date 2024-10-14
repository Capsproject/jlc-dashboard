import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const _auth = inject(AuthService)
  if(_auth.isLogIn()) {
      return true;
  } else {
    return false;
  }
};
