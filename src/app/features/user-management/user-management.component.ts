import { Component, inject, OnInit } from '@angular/core';
import { ColumnInterface } from '../../shared/components/table/models/data-table';
import { Technician } from '../job-order/models/api-response.interface';
import { FormControl } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { dummyTechnician } from '../../../../dummy';
import { TableComponent } from '../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { HttpResponse } from '@angular/common/http';
import { ApiResponse } from '../../shared/models/api-response';
import { Users } from './models/api-response';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [TableComponent, CommonModule],
  template: ` @if (data) {
    <app-table
      [data$]="data"
      [columns]="tableColumns"
      [searchKey$]="searchKey$"
    ></app-table>
    }`,
})
export class UserManagementComponent implements OnInit {
  public data!: Observable<Users[]>;
  searchKey = new FormControl();
  searchKey$ = this.searchKey.valueChanges;
  userServices = inject(UserService);
  public tableColumns: ColumnInterface<Users>[] = [
    {
      name: 'ID No.',
      tableBodyType: 'text',
      tableHeaderType: 'text',
      key: 'id',
      class: 'w-1/3',
    },
    {
      name: 'Name',
      tableBodyType: 'text',
      tableHeaderType: 'text',
      key: 'name',
      class: 'w-1/3',
    },
    {
      name: 'Email',
      tableBodyType: 'text',
      tableHeaderType: 'text',
      key: 'email',
      class: 'w-1/3',
    },
    {
      name: 'Active',
      tableBodyType: 'text',
      tableHeaderType: 'text',
      key: 'is_enabled',
      class: 'w-1/3',
    },
    {
      name: 'Created',
      tableBodyType: 'text',
      tableHeaderType: 'text',
      key: 'created_at',
      class: 'w-1/3',
    },
  ];

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userServices
      .getAllUsers()
      .pipe(
      )
      .subscribe({
        next: (res: HttpResponse<ApiResponse>) => {
            this.data = of(
            res.body?.data
              .map((user: { created_at: string | number | Date, is_enabled: number }) => ({
              ...user,
              created_at: new Date(user.created_at).toDateString(),
              is_enabled: user.is_enabled === 1 ? 'Active' : 'Inactive',
              }))
              .sort((a: { id: number; }, b: { id: number; }) => a.id - b.id)
            )
          console.log(this.data);
        },
      });
  }
}
