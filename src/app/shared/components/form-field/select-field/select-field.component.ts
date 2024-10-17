import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectField } from '../../../models/select-field.model';
import { FormvalidationService } from '../../../../core/services/formvalidation.service';
import { Roles } from '../../../models/roles.model';

@Component({
  selector: 'jlc-select-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<div
    [formGroup]="formGroup"
    class="block w-full text-left my-2 float-left"
  >
    <label
      [for]="controlName"
      class="block text-xxs font-medium text-gray-600 mb-1"
      [ngClass]="labelClass.length > 0 ? labelClass : []"
      >{{ label }}</label
    >
    <select
      [formControlName]="controlName"
      [id]="controlName"
      [name]="controlName"
      class="block w-full rounded-lg py-[10px] px-3 font-normal text-xs bg-white text-gray-600 border-0 border-r-[14px] border-transparent outline outline-1 outline-gray-300 focus:outline-gray-500 focus-visible:outline-gray-500 hover:outline-gray-500"
      [ngClass]="{
        '!outline-red-500':
          formControl.invalid && (formControl.dirty || formControl.touched)
      }"
    >
      @if (placeholder) {
      <option disabled value="" selected>{{ placeholder }}</option>
      } @for (option of options; track option) {
      <option [value]="option.value">{{ option.label }}</option>
      }
    </select>
    @if(formControl.invalid && (formControl.dirty || formControl.touched)) {
    <div class="text-red-500 text-xs mt-1">{{ getErrorMessage() }}</div>
    }
  </div>`,
  styleUrl: './select-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFieldComponent {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() options!: SelectField[] | undefined | null;
  @Input() labelClass: string[] = [];
  private readonly formValidationService = inject(FormvalidationService);


  public get formControl(): FormControl {
    return this.formGroup.get(this.controlName) as FormControl;
  }

  public getErrorMessage(): string {
    return this.formValidationService.getErrorMessage(this.formControl.errors);
  }
}
