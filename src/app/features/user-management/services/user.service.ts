import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;
  http = inject(HttpClient);

  getAllUsers(): Observable<any> {
    return this.http.get(this.url + 'admin/accounts', {observe: 'response'});
  }
}
