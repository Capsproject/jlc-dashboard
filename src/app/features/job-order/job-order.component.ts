import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { ColumnInterface } from '../../shared/components/table/models/data-table';
import { Technician } from './models/api-response.interface';
import { dummyTechnician } from '../../../../dummy';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/buttons/button/button.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { AuthService } from '../../core/auth/services/auth.service';
import { CreateJobComponent } from './components/create-job/create-job.component';
import { ViewJobOrderComponent } from './components/job-order/job-order.component';

@Component({
  selector: 'app-job-order',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    ReactiveFormsModule,
    ButtonComponent,
    LoadingComponent,
    CreateJobComponent,
    ViewJobOrderComponent,
  ],
  template: ` @if (loading) {
    <div class="h-[90vh] flex justify-center items-center">
      <app-loading />
    </div>
    } @else {
    <div class="flex">
      <app-button
        actionText="Create Request"
        buttonStyle="primary"
        [icon]="addIcon"
        (action)="this.openDialog()"
      />
    </div>
    <app-table
      [data$]="data"
      [columns]="tableColumns"
      [searchKey$]="searchKey$"
      (data)="this.openViewDialog()"
    />
    <dialog #jobCreateDialog class="w-1/2 rounded-lg">
      @if (accountType !== 'customer') {
      <jlc-create-job (close)="jobCreateDialog.close()" />
      }
    </dialog>
    <dialog #viewJobOrder class="w-1/2 rounded-lg">
      <jlc-view-job-order (close)="viewJobOrder.close()"/>
    </dialog>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobOrderComponent implements OnInit {
  @ViewChild('jobCreateDialog') jobCreateDialog!: ElementRef;
  @ViewChild('viewJobOrder') viewJobOrder!: ElementRef;
  public addIcon = 'icons/heroicons/outline/folder-plus.svg';
  public loading!: boolean;

  private readonly auth = inject(AuthService);

  public accountType = this.auth.userInfo.user_role.name;

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

  public openDialog() {
    this.jobCreateDialog.nativeElement.showModal();
  }

  public openViewDialog() {
    this.viewJobOrder.nativeElement.showModal();
  }


}
