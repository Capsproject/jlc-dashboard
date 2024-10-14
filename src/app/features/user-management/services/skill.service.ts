import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CreateSkillModel } from '../models/create-skill.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private url = environment.apiUrl;
  private readonly http = inject(HttpClient);


  public getSkills(): Observable<any> {
    return this.http.get(`${this.url}/skills`, { observe: 'response'});
  }

  public createSkills(data: CreateSkillModel) {
    return this.http.post(`${this.url}/skills`, data, { observe: 'response'});
  }

}
