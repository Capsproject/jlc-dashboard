import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, tap } from 'rxjs';
import { UserModel } from '../user-model';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserModel | null>(null);

  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map(user => !!user));

  private readonly http = inject(HttpClient);
  private readonly jwtService = inject(JwtService);
  private readonly router = inject(Router);

  login(email: string, password: string): Observable<{user: UserModel}> {
    return this.http.post<{user: UserModel}>('/auth/login', {email,password}).pipe(tap(({user}) => this.setAuth(user)));
  }

  logout(): void {
    this.purgeAuth();
    this.router.navigate(['/auth/login']);
  }

  private setAuth(user: UserModel): void {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
  }

  public purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
  }

  public update(user: Partial<UserModel>): Observable<{ user: UserModel }> {
    return this.http.put<{ user: UserModel }>("/user", { user }).pipe(
      tap(({ user }) => {
        this.currentUserSubject.next(user);
      }),
    );
  }




}
