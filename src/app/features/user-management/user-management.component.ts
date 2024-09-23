import { Component, OnInit } from '@angular/core';
import { ColumnInterface } from '../../shared/components/table/models/data-table';
import { Technician } from '../job-order/models/api-response.interface';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { dummyTechnician } from '../../../../dummy';
import { TableComponent } from '../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';

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
  public data!: Observable<Technician[]>;
  searchKey = new FormControl();
  searchKey$ = this.searchKey.valueChanges;
  public tableColumns: ColumnInterface<Technician>[] = [
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
      name: 'Skills',
      tableBodyType: 'text',
      tableHeaderType: 'text',
      key: 'skills',
      class: 'w-1/3',
    },
    {
      name: 'Location',
      tableBodyType: 'text',
      tableHeaderType: 'text',
      key: 'location',
      class: 'w-1/3',
    },
    {
      name: 'Availability',
      tableBodyType: 'text',
      tableHeaderType: 'text',
      key: 'availability',
      class: 'w-1/3',
    },
  ];

  ngOnInit(): void {
    this.data = of(dummyTechnician);
  }
}
