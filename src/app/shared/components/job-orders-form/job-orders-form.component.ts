import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'jlc-job-orders-form',
  standalone: true,
  imports: [
    CommonModule,
    FormFieldComponent
  ],
  template: `<div class="flex">
    <div class="w-1/2">
      <div class="flex items-center justify-between">
        <label class="text-sm font-semibold text-foreground">Create Job Order</label>
        <div class="flex">
          <div class="w-1/2">
            <app-form-field label="Job Order Number" type="text" placeholder="" />
          </div>
          <div class="w-1/2">
          </div>
        </div>
      </div>
  </div>`,
  styleUrl: './job-orders-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobOrdersFormComponent { }
