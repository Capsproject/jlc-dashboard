import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { ApiResponse } from '../../../shared/models/api-response';
import { LabelValuePair } from '../../../shared/models/label-value-pair';
import { Users } from '../models/api-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl;
  http = inject(HttpClient);
  customers = signal<LabelValuePair[]>([]);
  technicians = signal<LabelValuePair[]>([]);

  getAllUsers(): Observable<any> {
    return this.http.get(this.url + 'admin/accounts', { observe: 'response' });
  }

  getAllCustomers(){
    this.http
      .get<LabelValuePair[]>(this.url + 'admin/accounts')
      .subscribe((res : any) => {
        const users : Users[] = res.data.filter((user: Users) => user.user_role.id === 5);
        const customers: LabelValuePair[] = users.map((user: Users)=> {
          return {
            label: user.name,
            value: user.id.toString(),
          }
        })
        this.customers.set(customers);
      });
  }

  getAllTechnicians(){
    this.http
      .get<LabelValuePair[]>(this.url + 'admin/accounts')
      .subscribe((res : any) => {
        const users : Users[] = res.data.filter((user: Users) => user.user_role.id === 4);
        const customers: LabelValuePair[] = users.map((user: Users)=> {
          return {
            label: user.name,
            value: user.id.toString(),
          }
        })
        this.technicians.set(customers);
      });
  }

  getUserById(id: number): Observable<Users> {
    return this.http.get<Users>(this.url + 'admin/accounts/' + id);
  }

  public createUser(data: Credential) {
    return this.http.post<ApiResponse>(this.url + 'admin/accounts', data, {
      observe: 'response',
    });
  }

  public deleteUser(id: number) {
    return this.http.delete<ApiResponse>(this.url + 'admin/accounts/' + id, {
      observe: 'response',
    });
  }
}
