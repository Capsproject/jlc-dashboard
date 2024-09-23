import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { ColumnInterface } from '../../shared/components/table/models/data-table';
import { Technician } from './models/api-response.interface';
import { dummyTechnician } from '../../../../dummy';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-order',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule],
  template: ` @if (data) {
    <app-table [data$]="data" [columns]="tableColumns" [searchKey$]="searchKey$"></app-table>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobOrderComponent implements OnInit {
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
