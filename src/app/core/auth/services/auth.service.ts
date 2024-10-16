import { inject, Injectable, signal, ɵsetInjectorProfilerContext } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserModel } from '../models/user-model';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { AlertService } from '../../../shared/services/alert.service';
import { ApiResponseModel } from '../models/api-response-model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUserSubject = new BehaviorSubject<UserModel | null>(null);

  private userDetails = new BehaviorSubject<UserModel>({} as UserModel);
  public userDetails$ = this.userDetails.asObservable();
  userInfo: UserModel;

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly http = inject(HttpClient);
  private readonly jwtService = inject(JwtService);
  private readonly router = inject(Router);
  private readonly _alertService = inject(AlertService);
  private readonly loginS = inject(LoginService);

  isLoggedIn$ = this._isLoggedIn$.asObservable();

  public user = signal<UserModel | null>(null);
  get token(): string {
    return localStorage.getItem('user') || '';
  }
  constructor () {
    this._isLoggedIn$.next(!!this.token);
    this.userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {} as UserModel;
  }

  // Methods

  public isLogIn() {
    return this.isLoggedIn$;
  }

  public userDetail() {
    return this.userDetails$;
  }

  public logout(): void {
    this.loginS.logout()
    this.purgeAuth();
    this.router.navigate(['/auth/login']);
  }

  public get currenctUserValue(): UserModel | null {
    return this.currentUserSubject.value;
  }

  public setAuth(user: ApiResponseModel): void {
    this.jwtService.saveToken(user.token, user.user);
    localStorage.setItem('user', JSON.stringify(user.user));
    this.user.set(user.user);
    this.userInfo = user.user;
    this.currentUserSubject.next(user.user);
    this._isLoggedIn$.next(true);
  }

  public purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
  }

  public update(user: Partial<UserModel>): Observable<{ user: UserModel }> {
    return this.http.put<{ user: UserModel }>('/user', { user }).pipe(
      tap(({ user }) => {
        this.currentUserSubject.next(user);
      })
    );
  }
}
