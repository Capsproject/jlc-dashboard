import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export const httpInterceptorsInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const authToken = localStorage.getItem('authToken');

  req = req.clone({
    setHeaders: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
      'X-API-KEY': environment.apiKey,
    },
  });

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        localStorage.removeItem('authToken');
        router.navigate(['/auth/login']);
      }
      throw error;
    })
  );
};
