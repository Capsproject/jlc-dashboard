import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  Input,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormvalidationService } from '../../../core/services/formvalidation.service';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: ` <div
    [formGroup]="formGroup"
    class="block w-full text-left my-2 float-left"
  >
    <label
      [for]="controlName"
      class="block text-xxs font-medium text-gray-600 mb-1"
      >{{ label }}</label
    >
    @if(isTextArea) {
    <textarea
      class="resize rounded-md block w-full py-[10px] px-3 font-normal text-xs bg-white text-gray-600 outline-none border border-solid border-gray-300 focus:border-gray-500 focus-visible:border-gray-500 hover:border-gray-500 "
      [formControlName]="controlName"
    ></textarea>
    } @else {
    <input
      class="block w-full rounded-lg py-[10px] px-3 font-normal text-xs bg-white text-gray-600 outline-none border border-solid border-gray-300 focus:border-gray-500 focus-visible:border-gray-500 hover:border-gray-500"
      [ngClass]="{
        '!border-red-500':
          formControl.invalid && (formControl.dirty || formControl.touched)
      }"
      [formControlName]="controlName"
      [id]="controlName"
      [placeholder]="placeholder"
      [type]="type"
      [autocomplete]="autocomplete"
    />
    } @if(formControl.invalid && (formControl.dirty || formControl.touched)) {
    <div class="text-red-500 text-xs mt-1">{{ getErrorMessage() }}</div>
    }
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() autocomplete = '';
  @Input() isTextArea = false;

  private readonly formValidationService = inject(FormvalidationService);

  public get formControl(): FormControl {
    return this.formGroup.get(this.controlName) as FormControl;
  }

  public getErrorMessage(): string {
    return this.formValidationService.getErrorMessage(this.formControl.errors);
  }
}
