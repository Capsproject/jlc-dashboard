import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormvalidationService } from '../../../core/services/formvalidation.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { UtilitiesService } from '../../utilities/utilities.service';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AngularSvgIconModule],
  template: ` <div
    [formGroup]="formGroup"
    class="block w-full text-left float-left"
    [ngClass]="controlIndex === undefined ? 'my-2' : ''"
  >
    @if (label) {
    <label
      [for]="controlName"
      class="block text-xxs font-medium text-gray-600 mb-1"
      >{{ label }}</label
    >
    } @if (isTextArea) {
    <textarea
      class="resize rounded-md block w-full py-[10px] px-3 font-normal text-xs bg-white text-gray-600 outline-none border border-solid border-gray-300 focus:border-gray-500 focus-visible:border-gray-500 hover:border-gray-500 "
      [formControlName]="controlName"
    ></textarea>
    } @else {
    <div class="relative h-10">
      <input
        class="block w-full rounded-lg py-[10px] px-3 font-normal text-xs bg-white disabled:text-gray-300 disabled:bg-opacity-60 text-gray-600 outline-none border border-solid border-gray-300 focus:border-gray-500 focus-visible:border-gray-500 hover:border-gray-500 disabled:border-gray-300"
        [ngClass]="{
          '!border-red-500':
            formControl.invalid && (formControl.dirty || formControl.touched)
        }"
        [formControl]="formControl"
        [id]="controlName"
        [name]="controlName"
        [placeholder]="placeholder"
        [type]="type === 'password' && showPassword ? 'text' : type"
        [autocomplete]="autocomplete"
      />

      @if (type === 'password') {
      <button
        type="button"
        (click)="showPassword = !showPassword"
        class="absolute right-3 top-2 text-gray-400"
      >
        <svg-icon
          [src]="
            showPassword
              ? 'icons/heroicons/outline/eye.svg'
              : 'icons/heroicons/outline/eye-off.svg'
          "
          [svgClass]="'h-5 w-5'"
        />
      </button>
      } @else if (canClear) {
      <button
        (click)="onClear(this.controlIndex || 0)"
        class="absolute right-3 top-2 text-gray-400"
        fontSet="material-icons-outlined"
      >
        <svg-icon [src]="'icons/heroicons/outline/close.svg'" />
      </button>
      }
    </div>
    } @if (formControl.invalid && (formControl.dirty || formControl.touched)) {
    <div class="block w-full text-red-500 mt-1 text-xxs font-normal">
      {{ getErrorMessage() }}
    </div>
    }
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() controlIndex?: number;
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() autocomplete = '';
  @Input() canClear = false;
  @Input() isTextArea = false;
  @Output() clear = new EventEmitter<number>();

  public readonly iconUtil = inject(UtilitiesService);

  // 2. private properties

  // 3. public properties
  public showPassword = false;

  // 4a. dependency injection
  private readonly formValidationService = inject(FormvalidationService);

  // 4b. constructor to injected services - if unable to use inject

  // 5. lifecycle hooks

  // 6. private methods

  // 7. public methods
  public get formControl(): FormControl {
    if (this.controlIndex !== undefined) {
      // we have an index so this is a form array
      const formArray = this.formGroup.get(this.controlName) as FormArray;
      return formArray.at(this.controlIndex) as FormControl;
    }

    return this.formGroup.get(this.controlName) as FormControl;
  }

  public getErrorMessage(): string {
    return this.formValidationService.getErrorMessage(this.formControl.errors);
  }

  public onClear(index: number): void {
    this.clear.emit(index);
  }
}
