import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../shared/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;
  http = inject(HttpClient);

  getAllUsers(): Observable<any> {
    return this.http.get(this.url + 'admin/accounts', {observe: 'response'});
  }

  public createUser(data: Credential) {
    return this.http.post<ApiResponse>(this.url + 'admin/accounts', data, {observe: 'response'});
  }

  public deleteUser(id: number) {
    return this.http.delete<ApiResponse>(this.url + 'admin/accounts/' + id, {observe: 'response'});
  }
}
