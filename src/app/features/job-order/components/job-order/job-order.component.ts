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
import { ButtonComponent } from '../../../../shared/components/buttons/button/button.component';
import { UtilitiesService } from '../../../../shared/utilities/utilities.service';
import { SelectFieldComponent } from '../../../../shared/components/form-field/select-field/select-field.component';
import { warranty_options } from '../../../../core/constants/warrant';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { locations } from '../../../../core/constants/locations';
import { LabelValuePair } from '../../../../shared/models/label-value-pair';
import { serviceType } from '../../../../core/constants/servicetype';
import { brandOptions } from '../../../../core/constants/brand';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';
import { ImageUploadComponent } from '../../../../shared/components/file-upload/file-upload.component';
import { UserService } from '../../../user-management/services/user.service';

@Component({
  selector: 'jlc-view-job-order',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    SelectFieldComponent,
    FormFieldComponent,
    ImageUploadComponent,
    ReactiveFormsModule,
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
        Billing & Parts Replacement Details
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
        Technician
      </label>

      <div class="bg-green-200 hidden peer-checked/tab-one:block p-4 w-full">
        <div
          class="flex w-full gap-2 lg:flex-nowrap md:flex-nowrap sm:flex-wrap"
        >
          <div class="lg:w-1/2 sm:w-full md:w-1/2 flex flex-col">
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
          <div class="lg:w-1/2 sm:w-full md:w-1/2 flex flex-col">
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
        <div class="flex w-full gap-2 flex-wrap">
          <div class="lg:w-1/2 sm:w-full flex flex-col">
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
          <div class="lg:w-1/2 sm:w-full flex flex-col flex-wrap">
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
        <div class="flex flex-wrap">
          <p class="font-medium text-base">
            Physical Condition (Specify any particular scratches, marks, or
            damages)
          </p>
        </div>
        <div class="flex w-full gap-2 flex-wrap">
          <div class="lg:w-1/2 sm:w-full flex flex-col flex-wrap">
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
          <div class="lg:w-1/2 sm:w-full flex flex-col flex-wrap">
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
        <app-button
          (action)="addBillProduct()"
          buttonStyle="primary"
          actionText="Add Product"
          [icon]="iconS.getIcon('plus')"
        ></app-button>
        <!-- <button (click)="addProduct()" class="bg-green-500 text-white px-4 py-2 rounded-lg">Add Product</button> -->
        <div [formGroup]="techInfo" class="mt-2">
          <ng-container formArrayName="billsProduct">
            <ng-container
              *ngFor="let billForm of billsProduct.controls; let index = index"
              [formGroupName]="index"
            >
              <div class="flex gap-1 mt-1 flex-wrap">
                <div class="w-2/6">
                  <input
                    class="block w-full rounded-lg py-[10px] px-3 font-normal text-xs bg-white disabled:text-gray-300 disabled:bg-opacity-60 text-gray-600 outline-none border border-solid border-gray-300 focus:border-gray-500 focus-visible:border-gray-500 hover:border-gray-500 disabled:border-gray-300"
                    formControlName="productName"
                    id="productName"
                    placeholder="Enter Product Name"
                    autocomplete="productName"
                    [ngClass]="{
                      '!border-red-500':
                        billsProduct.get('productName')?.value.invalid &&
                        (billsProduct.get('productName')?.value?.dirty ||
                          billsProduct.get('productName')?.value.touched)
                    }"
                  />
                </div>
                <div class="w-2/6">
                  <input
                    class="block w-full rounded-lg py-[10px] px-3 font-normal text-xs bg-white disabled:text-gray-300 disabled:bg-opacity-60 text-gray-600 outline-none border border-solid border-gray-300 focus:border-gray-500 focus-visible:border-gray-500 hover:border-gray-500 disabled:border-gray-300"
                    formControlName="productQuantity"
                    [ngClass]=""
                    id="productQuantity"
                    placeholder="Enter Product Quantity"
                    autocomplete="productQuantity"
                    [ngClass]="{
                      '!border-red-500':
                        billsProduct.get('productQuantity')?.value.invalid &&
                        (billsProduct.get('productQuantity')?.value?.dirty ||
                          billsProduct.get('productQuantity')?.value.touched)
                    }"
                  />
                </div>
                <div class="w-2/6">
                  <input
                    class="block w-full rounded-lg py-[10px] px-3 font-normal text-xs bg-white disabled:text-gray-300 disabled:bg-opacity-60 text-gray-600 outline-none border border-solid border-gray-300 focus:border-gray-500 focus-visible:border-gray-500 hover:border-gray-500 disabled:border-gray-300"
                    formControlName="productPrice"
                    [ngClass]=""
                    id="productPrice"
                    placeholder="Enter Product Quantity"
                    autocomplete="productPrice"
                    [ngClass]="{
                      '!border-red-500':
                        billsProduct.get('productPrice')?.value.invalid &&
                        (billsProduct.get('productPrice')?.value?.dirty ||
                          billsProduct.get('productPrice')?.value.touched)
                    }"
                  />
                </div>
                <div class="w-1/6">
                  <button
                    (click)="removeProduct(index)"
                    class="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </ng-container>
          </ng-container>
          <div class="flex justify-end">
            <div class="w-1/6">
              <app-form-field
                [formGroup]="techInfo"
                controlName="grandTotal"
                label="Grand Total"
                type="text"
                autocomplete="grandTotal"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-green-200 hidden peer-checked/tab-four:block p-4 w-full">
        <div class="flex flex-col">
          <jlc-select-field
            [formGroup]="createJobReq"
            controlName="customer_id"
            label="Customer"
            placeholder="Select Customer"
            [options]="userS.technicians()"
          />
          <app-form-field
            [formGroup]="techInfo"
            controlName="memo"
            label="Memo"
            placeholder="Enter Memo"
            type="text"
            autocomplete="memo"
            [isTextArea]="true"
          />
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewJobOrderComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  techInfo!: FormGroup;
  createJobReq!: FormGroup;
  billInfo!: FormArray;
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

  public readonly userS = inject(UserService);

  constructor() {
    this.userS.getAllTechnicians();
    effect(() => {
      this.customers = this.userS.customers();
    });
  }

  ngOnInit(): void {
    this.initiateForm();
    this.techInfoForm();
    this.techInfo.get('billsProduct')?.valueChanges.subscribe(() => {
      this.updateGrandTotal();
    });
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
      billsProduct: this.fb.array([]),
      grandTotal: [''],
      memo: [''],
    });
  }

  removeProduct(index: number): void {
    this.billsProduct.removeAt(index);
    this.updateGrandTotal(); // Recalculate after removing
  }

  updateGrandTotal(): void {
    const total = this.billsProduct.controls.reduce((sum, product) => {
      const quantity = product.get('productQuantity')?.value || 0;
      const price = product.get('productPrice')?.value || 0;
      return sum + quantity * price;
    }, 0);

    // Update the grandTotal form control
    this.techInfo.get('grandTotal')?.setValue(total);
  }

  public get billsProduct(): FormArray {
    return this.techInfo.get('billsProduct') as FormArray;
  }

  addBillProduct(): void {
    const productForm = this.fb.group({
      productName: ['', Validators.required],
      productQuantity: [1, [Validators.required, Validators.min(1)]],
      productPrice: [0, [Validators.required, Validators.min(0.01)]],
    });

    this.billsProduct.push(productForm);
  }

  createProduct(): FormGroup {
    return this.fb.group({
      productName: ['', Validators.required],
      productQuantity: ['', [Validators.required, Validators.min(1)]],
      productPrice: ['', [Validators.required, Validators.min(0.01)]],
    });
  }
}
