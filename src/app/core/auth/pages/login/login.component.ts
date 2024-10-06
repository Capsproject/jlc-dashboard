import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../user-model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormFieldComponent],
  template: ` <div class="flex h-screen">
    <div
      class="w-full max-w-xs m-auto bg-white text-black rounded-lg shadow-md p-5"
    >
      <header>
        <img class="w-20 mx-auto" src="images/jlc_logo.png" />
      </header>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <p class="mt-2 font-bold">Sign in to your account</p>
        <app-form-field
          [formGroup]="form"
          controlName="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          autocomplete="email"
        />
        <app-form-field
          [formGroup]="form"
          controlName="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          autocomplete="password"
        />

        <button
          type="submit"
          class="w-full my-2 mx-0 p-2 border-0 rounded-lg text-sm leading-6 font-medium bg-emerald-600 text-white hover:bg-emerald-500 hover:cursor-pointer"
        >
          Sign in
        </button>
        @if (submitted && error) {
        <p class="text-red my-2 text-sm float-left w-full">{{ error }}</p>
        }
      </form>
      <footer>
        <a
          class="text-emerald-700 hover:text-emerald-700 text-sm float-left"
          routerLink="/register"
          >Forgot Password?</a
        >
        <a
          class="text-emerald-700 hover:text-emerald-700 text-sm float-right"
          routerLink="/register"
          >Create Account</a
        >
      </footer>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  public loading = false;
  public submitted = false;
  public error = '';

  public loginForm!: FormGroup;

  private readonly authenticationService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  handleLoginSubmit() {
    this.authenticationService.login(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value
    );
  }
  public onSubmit(): void {
    this.submitted = true;
    if (!this.form.valid) {
      return;
    }

    this.error = '';
    this.loading = true;
    this.authenticationService
      .login(
        this.form.controls['email'].value,
        this.form.controls['password'].value
      )
      .subscribe({
        next: (response) => {
          if (response) {
            // get return url from route parameters or default to '/'
            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
          } else {
            if (response) {
              this.error = 'Login Failed';
            }
          }
        },
        error: (error) => {
          console.log(error);
          this.error = 'Login Failed';
          this.loading = false;
        },
      });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
}
