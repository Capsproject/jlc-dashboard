import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobOrderService {

  private url = environment.apiUrl;

  private readonly http = inject(HttpClient);

  public createJobOrder(data: FormData) {
    return this.http.post(`${this.url}/job-order`, data, {observe: 'response'});
  }

}
