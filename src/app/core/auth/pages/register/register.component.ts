import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormFieldComponent, RouterLink, ReactiveFormsModule],
  template: `
    <div class="flex h-screen">
      <div
        class="w-full max-w-md m-auto bg-white text-black rounded-lg shadow-md p-5"
      >
        <header>
          <img class="w-20 mx-auto" src="images/jlc_logo.png" />
        </header>
        <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
          <p class="mt-2 font-bold">Create your Account</p>
          <app-form-field
            [formGroup]="registrationForm"
            controlName="name"
            label="Name"
            placeholder="Enter your name"
            type="text"
            autocomplete="name"
          />
          <app-form-field
            [formGroup]="registrationForm"
            controlName="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            autocomplete="email"
          />
          <app-form-field
            [formGroup]="registrationForm"
            controlName="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            autocomplete="password"
          />
          <app-form-field
            [formGroup]="registrationForm"
            controlName="confirmPassword"
            label="Confirm Password"
            placeholder="Enter your password"
            type="password"
            autocomplete="password"
          />
          @if (registrationForm.controls['password'].value !==
          registrationForm.controls['confirmPassword'].value ) {
          <p class="text-xs text-red-500">Passwords do not match</p>
          }
          <button
            type="submit"
            class="w-full my-2 mx-0 p-2 border-0 rounded-lg text-sm leading-6 font-medium bg-emerald-600 text-white hover:bg-emerald-500 hover:cursor-pointer disabled:opacity-50"
            [disabled]="checkInvalid()"
          >
            Create Account
          </button>
        </form>
        <footer class="flex justify-start gap-1">
          <p class="text-emerald-700 text-sm float-left">
            Already have an account?
          </p>
          <a
            class="text-emerald-700 hover:text-emerald-700  underline text-sm float-right"
            routerLink="/auth/login"
            >Login</a
          >
          >
        </footer>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  registrationForm!: FormGroup;

  constructor() {
    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.registrationForm.value);
  }

  public checkInvalid(): boolean {
    if (
      this.registrationForm.controls['password'].value !==
        this.registrationForm.controls['confirmPassword'].value ||
      this.registrationForm.invalid
    ) {
      return true;
    }
    return false;
  }
}
