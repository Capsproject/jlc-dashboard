import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Roles } from '../models/roles.model';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private url = environment.apiUrl;
  private readonly http = inject(HttpClient);

  public getRoles() {
    return this.http.get<Roles[]>(this.url + 'admin/roles', { observe: 'response' });
  }
}
