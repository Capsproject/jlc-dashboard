import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { LoginCredentials } from '../models/login-credentials';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  url = environment.apiUrl;
  onLogin(data: LoginCredentials) {
    return this.http.post<object>(this.url + 'auth/login', data, {
      observe: 'response',
    })}
}
