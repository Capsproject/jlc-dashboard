import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  Signal,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';
import { SelectFieldComponent } from '../../../../shared/components/form-field/select-field/select-field.component';
import { warranty_options } from '../../../../core/constants/warrant';
import { brandOptions } from '../../../../core/constants/brand';
import { serviceType } from '../../../../core/constants/servicetype';
import { ButtonComponent } from '../../../../shared/components/buttons/button/button.component';
import { ImageUploadComponent } from '../../../../shared/components/file-upload/file-upload.component';
import { JobOrderService } from '../../services/job-order.service';
import { LabelValuePair } from '../../../../shared/models/label-value-pair';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { UserService } from '../../../user-management/services/user.service';
import { Users } from '../../../user-management/models/api-response';
import { Observable } from 'rxjs';
import { locations } from '../../../../core/constants/locations';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'jlc-create-job',
  standalone: true,
  imports: [
    CommonModule,
    FormFieldComponent,
    ReactiveFormsModule,
    SelectFieldComponent,
    ButtonComponent,
    ImageUploadComponent,
  ],
  template: ` <div class="flex p-4 w-full gap-2 flex-col">
    <div class="flex gap-2">
      @if(steps === 1) { @if(accountType !== 'customer') {
      <jlc-select-field
        [formGroup]="createJobReq"
        controlName="customer_id"
        label="Customer"
        placeholder="Select Customer"
        [options]="userS.customers()"
      />
      <!-- Todo Upon Selection Patch The Value of the Profile -->
      } } @if(steps === 2) {
      <div class="w-1/2 flex flex-col">
        <app-form-field
          [formGroup]="createJobReq"
          controlName="name"
          label="Name"
          placeholder="Enter Name"
          type="text"
          autocomplete="name"
        />
        <jlc-select-field
          [formGroup]="createJobReq"
          controlName="address"
          label="Address"
          placeholder="Select Address"
          [options]="locations"
        />
        <app-form-field
          [formGroup]="createJobReq"
          controlName="email"
          label="Email"
          placeholder="Enter Email"
          type="email"
          autocomplete="email"
        />
        <app-form-field
          [formGroup]="createJobReq"
          controlName="mobile_number"
          label="Mobile Number"
          placeholder="Enter Mobile Number"
          type="text"
          autocomplete="mobile_number"
        />
        <app-form-field
          [formGroup]="createJobReq"
          controlName="date_purchased"
          label="Date Purchased"
          placeholder="Enter Date Purchased"
          type="date"
          autocomplete="date_purchased"
        />
        <jlc-select-field
          [formGroup]="createJobReq"
          controlName="warranty_status"
          label="Warranty Status"
          placeholder="Select Warranty Status"
          [options]="warrantyOptions"
        />
        <app-form-field
          [formGroup]="createJobReq"
          controlName="trouble_reported"
          label="Trouble Reported"
          placeholder="Enter Trouble Reported"
          type="text"
          autocomplete="trouble_reported"
          [isTextArea]="true"
        />
      </div>
      <div class="w-1/2 flex flex-col">
        <app-form-field
          [formGroup]="createJobReq"
          controlName="date_received"
          label="Date Received"
          placeholder="Enter Date Received"
          type="date"
          autocomplete="date_received"
        />
        <jlc-select-field
          [formGroup]="createJobReq"
          controlName="brand_name"
          label="Brand Name"
          placeholder="Select Brand Name"
          [options]="brandOptions"
        />
        <jlc-select-field
          [formGroup]="createJobReq"
          controlName="service_type"
          label="Service Type"
          placeholder="Select Service Type"
          [options]="serviceType"
        />

        <jlc-image-upload (selectedFile)="onFileSelected($event)" />
      </div>
      }
    </div>
    <div class="flex justify-end gap-2">
      @if(steps === 1) {
      <app-button actionText="Next" class="primary" (action)="next()" />
      } @if(steps === 2) {
      <app-button actionText="Back" class="primary" (action)="(prev())" />
      <app-button
        actionText="Create"
        loadingText="Creating..."
        class="primary"
        (action)="onSubmit()"
        [disabled]="!createJobReq.valid"
      />
      }
      <app-button
        actionText="Cancel"
        [buttonStyle]="'danger'"
        (action)="closeModal()"
      />
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateJobComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  createJobReq!: FormGroup;
  warrantyOptions = warranty_options;
  brandOptions = brandOptions;
  serviceType = serviceType;
  selectedFile!: File;
  customers?: LabelValuePair[];
  accountType!: string;
  steps = 1;
  locations: LabelValuePair[] = locations;

  constructor() {
    this.accountType = this.auth.userInfo.user_role.name;
    if (this.accountType !== 'customer') {
      this.steps = 1;
      this.userS.getAllCustomers();
    } else {
      this.steps = 2;
      // Get and Patch The customer Info Here
    }
    effect(() => {
      this.customers = this.userS.customers();
    });
  }

  public loading = true;

  private readonly fb = inject(FormBuilder);
  private readonly jobOrderService = inject(JobOrderService);
  private readonly auth = inject(AuthService);
  public readonly userS = inject(UserService);
  private readonly Alert = inject(AlertService);

  ngOnInit() {
    this.initiateForm();
  }

  next() {
    if (this.createJobReq.controls['customer_id'].value === '') {
      this.createJobReq.controls['customer_id'].setErrors({ required: true });
    } else {
      this.steps++;
      console.log(this.steps);
    }
  }
  prev() {
    this.steps--;
  }
  initiateForm() {
    this.createJobReq = this.fb.group({
      name: [''],
      address: ['', Validators.required],
      email: ['', Validators.email],
      mobile_number: ['', Validators.required, Validators.pattern('^[0-9]*$')],
      date_purchased: ['', Validators.required],
      warranty_status: ['', Validators.required],
      trouble_reported: [''],
      date_received: ['', Validators.required],
      brand_name: ['', Validators.required],
      service_type: ['', Validators.required],
      upload_proof: [''],
      customer_id: [''],
    });
  }


  onFileSelected(file: File) {
    this.selectedFile = file;
  }

  onSubmit() {
    if(this.createJobReq.invalid) {
      this.createJobReq.markAllAsTouched();
      return;
    }
    const formData = new FormData();
    // Append form fields to FormData
    Object.keys(this.createJobReq.controls).forEach((key) => {
      const value = this.createJobReq.get(key)?.value;
      if (key === 'upload_proof') {
        formData.append(key, this.selectedFile);
      } else {
        formData.append(key, value);
      }
      console.log(formData);
    });

    this.jobOrderService.createJobOrder(formData).subscribe(
      {
        next: (res) => {
          this.closeModal();
          this.Alert.handleSuccess('Job Order Created Successfully');
        },
        error: (err: Error) => {
          this.Alert.handleError(err.message);
        }
      }
    )
  }

  closeModal() {
    this.createJobReq.reset();
    this.close.emit();
  }
}
