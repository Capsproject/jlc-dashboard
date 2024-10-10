import { Component, inject, OnInit, signal } from '@angular/core';
import { ColumnInterface } from '../../shared/components/table/models/data-table';
import { Technician } from '../job-order/models/api-response.interface';
import { FormControl } from '@angular/forms';
import { map, Observable, of, Subscription } from 'rxjs';
import { dummyTechnician } from '../../../../dummy';
import { TableComponent } from '../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { HttpResponse } from '@angular/common/http';
import { ApiResponse } from '../../shared/models/api-response';
import { Users } from './models/api-response';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ButtonComponent } from '../../shared/components/buttons/button/button.component';
import { icons } from '../../core/constants/icons';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [TableComponent, CommonModule, LoadingComponent, ButtonComponent],
  template: ` @if (loadingFetchApi()) {
    <div class="flex h-[90vh] justify-center items-center">
      <app-loading />
    </div>
    }@else {
      <div class="flex justify-start">
        <app-button actionText="Add User" [buttonStyle]="'primary'" [icon]="getIcon('plus')"/>
      </div>
    <app-table
      [data$]="data"
      [columns]="tableColumns"
      [searchKey$]="searchKey$"
    ></app-table>

    }`,
})
export class UserManagementComponent implements OnInit {
  public data!: Observable<Users[]>;
  public searchKey = new FormControl();
  public searchKey$ = this.searchKey.valueChanges;
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
  public loadingFetchApi = signal(false);
  private userSubscription: Subscription = new Subscription();
  private readonly userServices = inject(UserService);

  ngOnInit(): void {
    this.fetchUsers();
  }

  getIcon(icon: string): string {
    return icons.find((i) => i.label === icon)?.value ?? '';
  }

  fetchUsers() {
    this.loadingFetchApi.set(true);
    this.userSubscription.add(
      this.userServices.getAllUsers().subscribe({
        next: (res: HttpResponse<ApiResponse>) => {
          this.data = of(
            res.body?.data
              .map(
                (user: {
                  created_at: string | number | Date;
                  is_enabled: number;
                }) => ({
                  ...user,
                  created_at: new Date(user.created_at).toDateString(),
                  is_enabled: user.is_enabled === 1 ? 'Active' : 'Inactive',
                })
              )
              .sort((a: { id: number }, b: { id: number }) => a.id - b.id)
          );
          console.log(this.data);
        },
        complete: () => {
          this.loadingFetchApi.set(false);
        },
      })
    );
  }
}
