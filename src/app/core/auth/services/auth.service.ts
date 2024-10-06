import { inject, Injectable, signal } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  tap,
} from 'rxjs';
import { UserModel } from '../user-model';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { ApiResponseModel } from '../api-response-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUserSubject = new BehaviorSubject<UserModel | null>(null);
  private url = environment.apiUrl;
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private userDetails = new BehaviorSubject<UserModel>({} as UserModel);
  public userDetails$ = this.userDetails.asObservable();

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly http = inject(HttpClient);
  private readonly jwtService = inject(JwtService);
  private readonly router = inject(Router);

  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor() {
    this._isLoggedIn$.next(!!this.jwtService.getToken());
  }

  public isLogIn() {
    return this.isLoggedIn$;
  }

  public userDetail() {
    return this.userDetails$;
  }
  public login(
    email: string,
    password: string
  ): Observable<{ token: string; user: ApiResponseModel['user'] }> {
    return this.http
      .post<{ token: string; user: ApiResponseModel['user'] }>(
        this.url + '/auth/login',
        {
          email,
          password,
        }
      )
      .pipe(
        tap((user) => {
          this.setAuth(user);
        })
      );
  }

  public logout(): void {
    this.purgeAuth();
    this.router.navigate(['/auth/login']);
  }

  public get currenctUserValue(): UserModel | null {
    return this.currentUserSubject.value;
  }

  private setAuth(user: ApiResponseModel): void {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user.user);
    this._isLoggedIn$.next(true);
    console.log(this.currentUser);
    if (this.currenctUserValue?.user_role.name === 'superadmin') {
      console.log('superadmin');
      this.router.navigate(['/admin/user']);
    } else {
      this.router.navigate(['/customer/transaction']);
    }
  }

  public purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
  }

  public update(user: Partial<UserModel>): Observable<{ user: UserModel }> {
    return this.http.put<{ user: UserModel }>('/user', { user }).pipe(
      tap(({ user }) => {
        this.currentUserSubject.next(user);
      })
    );
  }
}
