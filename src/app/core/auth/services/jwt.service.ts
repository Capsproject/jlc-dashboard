import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  public getToken(): string {
    return window.localStorage[environment.tokenName];
  }

  public saveToken(token: string): void {
    window.localStorage[environment.tokenName] = token;
  }

  public destroyToken(): void {
    window.localStorage.removeItem(environment.tokenName);
  }
}
