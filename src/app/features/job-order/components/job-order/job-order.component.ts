import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/buttons/button/button.component';
import { UtilitiesService } from '../../../../shared/utilities/utilities.service';
import { SelectFieldComponent } from '../../../../shared/components/form-field/select-field/select-field.component';
import { warranty_options } from '../../../../core/constants/warrant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { locations } from '../../../../core/constants/locations';
import { LabelValuePair } from '../../../../shared/models/label-value-pair';
import { serviceType } from '../../../../core/constants/servicetype';
import { brandOptions } from '../../../../core/constants/brand';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';
import { ImageUploadComponent } from '../../../../shared/components/file-upload/file-upload.component';

@Component({
  selector: 'jlc-view-job-order',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    SelectFieldComponent,
    FormFieldComponent,
    ImageUploadComponent,
  ],
  template: `
    <div class="flex justify-between p-4">
      <div class="flex flex-row">
        <h1 class="text-2xl font-bold">Job Order</h1>
      </div>
      <div class="flex flex-row items-center">
        <app-button
          actionText="Close"
          buttonStyle="primary"
          [icon]="iconS.getIcon('close')"
          (action)="onClose()"
        ></app-button>
      </div>
    </div>
    <section class="flex flex-row flex-wrap px-4 pb-4">
      <input
        id="tab-one"
        type="radio"
        name="tabs"
        class="peer/tab-one opacity-0 absolute"
        checked
      />
      <label
        for="tab-one"
        class="bg-slate-300 hover:bg-slate-200 peer-checked/tab-one:bg-green-200 cursor-default p-4 rounded-t-lg block"
      >
        Customer Info
      </label>

      <input
        id="tab-two"
        type="radio"
        name="tabs"
        class="peer/tab-two opacity-0 absolute"
      />
      <label
        for="tab-two"
        class="bg-slate-300 hover:bg-slate-200 peer-checked/tab-two:bg-green-200 cursor-default p-4 rounded-t-lg block"
      >
        Trouble Info
      </label>

      <input
        id="tab-three"
        type="radio"
        name="tabs"
        class="peer/tab-three opacity-0 absolute"
      />
      <label
        for="tab-three"
        class="bg-slate-300 hover:bg-slate-200 peer-checked/tab-three:bg-green-200 cursor-default p-4 rounded-t-lg block"
      >
        Three
      </label>
      <input
        id="tab-four"
        type="radio"
        name="tabs"
        class="peer/tab-four opacity-0 absolute"
      />
      <label
        for="tab-four"
        class="bg-slate-300 hover:bg-slate-200 peer-checked/tab-four:bg-green-200 cursor-default p-4 rounded-t-lg block"
      >
        Four
      </label>

      <div class="bg-green-200 hidden peer-checked/tab-one:block p-4 w-full">
        <div class="flex w-full gap-2">
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
          </div>
        </div>
      </div>
      <!-- Tab 2 -->
      <div class="bg-green-200 hidden peer-checked/tab-two:block p-4 w-full">
        <div class="flex w-full gap-2">
          <div class="w-1/2 flex flex-col">
            <app-form-field
              [formGroup]="techInfo"
              controlName="accessories"
              label="Accessories"
              placeholder="Enter Accessories"
              type="text"
              autocomplete="accessories"
            />
            <app-form-field
              [formGroup]="createJobReq"
              controlName="trouble_reported"
              label="Trouble Reported"
              placeholder="Enter Trouble Reported"
              type="text"
              autocomplete="trouble_reported"
            />
          </div>
          <div class="w-1/2 flex flex-col">
            <app-form-field
              [formGroup]="techInfo"
              controlName="troublesFound"
              label="Trouble Found"
              placeholder="Enter Trouble Found"
              type="text"
              autocomplete="troublesFound"
              [isTextArea]="true"
            />
          </div>
        </div>
        <div class="flex">
          <p class="font-medium text-base">
            Physical Condition (Specify any particular scratches, marks, or
            damages)
          </p>
        </div>
        <div class="flex w-full gap-2">
          <div class="w-1/2 flex flex-col">
            <app-form-field
              [formGroup]="techInfo"
              controlName="frontView"
              label="Front View"
              placeholder="Enter Details"
              type="text"
              autocomplete="frontView"
            />
            <app-form-field
              [formGroup]="techInfo"
              controlName="topView"
              label="Top View"
              placeholder="Enter Details"
              type="text"
              autocomplete="topView"
            />
            <app-form-field
              [formGroup]="techInfo"
              controlName="backView"
              label="Back View"
              placeholder="Enter Details"
              type="text"
              autocomplete="backView"
            />
          </div>
          <div class="w-1/2 flex flex-col">
            <app-form-field
              [formGroup]="techInfo"
              controlName="bottomView"
              label="Bottom View"
              placeholder="Enter Details"
              type="text"
              autocomplete="bottomView"
            />
            <app-form-field
              [formGroup]="techInfo"
              controlName="leftView"
              label="Left View"
              placeholder="Enter Details"
              type="text"
              autocomplete="leftView"
            />
            <app-form-field
              [formGroup]="techInfo"
              controlName="rightView"
              label="Right View"
              placeholder="Enter Details"
              type="text"
              autocomplete="rightView"
            />
          </div>
        </div>
      </div>

      <!-- Tab 3 -->
      <div class="bg-green-200 hidden peer-checked/tab-three:block p-4 w-full">
        Third tab pane
      </div>
      <div class="bg-green-200 hidden peer-checked/tab-four:block p-4 w-full">
        Fourth tab pane
      </div>
    </section>
  `,
  styleUrl: './job-order.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewJobOrderComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  techInfo!: FormGroup;
  createJobReq!: FormGroup;
  warrantyOptions = warranty_options;
  brandOptions = brandOptions;
  serviceType = serviceType;
  selectedFile!: File;
  customers?: LabelValuePair[];
  accountType!: string;
  steps = 1;
  locations: LabelValuePair[] = locations;
  iconS = inject(UtilitiesService);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initiateForm();
    this.techInfoForm();
  }
  public onClose(): void {
    this.close.emit();
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
  techInfoForm() {
    this.techInfo = this.fb.group({
      accessories: [''],
      troublesFound: [''],
      frontView: [''],
      topView: [''],
      backView: [''],
      bottomView: [''],
      leftView: [''],
      rightView: [''],
    });
  }
}
