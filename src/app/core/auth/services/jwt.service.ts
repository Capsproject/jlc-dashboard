import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  public getToken(): string {
    return window.localStorage[environment.tokenName];
  }

  public saveToken(token: string, user: UserModel): void {
    window.localStorage[environment.tokenName] = token;
    window.localStorage['user'] = user;
  }

  public destroyToken(): void {
    window.localStorage.removeItem(environment.tokenName);
  }
}
