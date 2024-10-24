import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { warranty_options } from '../../../../core/constants/warrant';
import { brandOptions } from '../../../../core/constants/brand';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';
import { locations } from '../../../../core/constants/locations';
import { SelectFieldComponent } from '../../../../shared/components/form-field/select-field/select-field.component';
import { ButtonComponent } from '../../../../shared/components/buttons/button/button.component';
import { UserService } from '../../../user-management/services/user.service';
import { LabelValuePair } from '../../../../shared/models/label-value-pair';

@Component({
  selector: 'jlc-assign-tech',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldComponent,
    SelectFieldComponent,
    ButtonComponent,
  ],
  template: `
    <div class="flex flex-col p-4">
      <div
        class="w-full gap-2 flex flex-row md:flex-nowrap sm:flex-wrap lg:flex-nowrap
  "
      >
        <div class="w-1/2 flex flex-col">
          <app-form-field
            [formGroup]="asssignTechForm"
            controlName="name"
            label="Name"
            placeholder="Enter Name"
            type="text"
            autocomplete="name"
          />
          <jlc-select-field
            [formGroup]="asssignTechForm"
            controlName="address"
            label="Address"
            placeholder="Select Address"
            [options]="locations"
          />
          <app-form-field
            [formGroup]="asssignTechForm"
            controlName="email"
            label="Email"
            placeholder="Enter Email"
            type="email"
            autocomplete="email"
          />
          <app-form-field
            [formGroup]="asssignTechForm"
            controlName="mobile_number"
            label="Mobile Number"
            placeholder="Enter Mobile Number"
            type="text"
            autocomplete="mobile_number"
          />
        </div>
        <div class="w-1/2 flex flex-col">
          <app-form-field
            [formGroup]="asssignTechForm"
            controlName="trouble_reported"
            label="Trouble Reported"
            placeholder="Enter Trouble Reported"
            type="text"
            autocomplete="trouble_reported"
            [isTextArea]="true"
          />
          <jlc-select-field
            [formGroup]="asssignTechForm"
            controlName="brand_name"
            label="Brand Name"
            placeholder="Select Brand Name"
            [options]="brandOptions"
          />
          <jlc-select-field
            [formGroup]="asssignTechForm"
            controlName="warranty_status"
            label="Warranty Status"
            placeholder="Select Warranty Status"
            [options]="warrantyOptions"
          />
          <app-form-field
            [formGroup]="asssignTechForm"
            controlName="date_received"
            label="Date Received"
            placeholder="Enter Date Received"
            type="date"
            autocomplete="date_received"
          />
        </div>
      </div>
      <div class="w-full flex flex-col gap-1">
        <jlc-select-field
          [formGroup]="asssignTechForm"
          controlName="techId"
          label="Technician"
          placeholder="Select Technician"
          [options]="techs"
        />
        <app-form-field
          [formGroup]="asssignTechForm"
          controlName="schedDate"
          label="Schedule Date"
          placeholder="Enter Schedule Date"
          type="date"
          autocomplete="schedDate"
        />
      </div>
      <div class="w-full flex gap-1 justify-end">
        <app-button
          actionText="Close"
          buttonStyle="danger"
          (action)="this.close.emit()"
        />
        <app-button
          actionText="Assign"
          buttonStyle="primary"
          (action)="this.close.emit()"
        />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignTechComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  technicians = inject(UserService);
  techs?: LabelValuePair[];
  constructor() {
    this.technicians.getAllTechnicians();
    effect(() => {
      this.techs = this.technicians.technicians();
    })
  }

  ngOnInit(): void {
    this.initiateForm();
  }

  warrantyOptions = warranty_options;
  locations = locations;
  brandOptions = brandOptions;
  asssignTechForm!: FormGroup;
  fb = inject(FormBuilder);
  initiateForm() {
    this.asssignTechForm = this.fb.group({
      name: [{value: '', disabled: true}],
      address: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      mobile_number: [{value: '', disabled: true}],
      trouble_reported: [{value: '', disabled: true}],
      brand_name: [{value: '', disabled: true}],
      warranty_status: [{value: '', disabled: true}],
      date_received: [{value: '', disabled: true}],
      customer_id: [{value: '', disabled: true}],
      techId: [{value: '', disabled: false}],
      schedDate: [{value: '', disabled: false}],
    });
  }
}
