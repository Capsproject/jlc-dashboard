import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
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
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AlertService } from '../../../../shared/services/alert.service';
import { LoginService } from '../../services/login.service';
import { ApiResponseModel } from '../../models/api-response-model';

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
      <form [formGroup]="form" (ngSubmit)="handleLoginSubmit()">
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
  public isLoadingButton = signal(false);
  public submitted = false;
  public error = '';


  private readonly authenticationService = inject(AuthService);
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly _alertService = inject(AlertService);

  private loginSubscription: Subscription = new Subscription();

  handleLoginSubmit() {
    this.loginSubscription.add(
      this.loginService.onLogin(this.form.value).subscribe({
        next: (response: HttpResponse<object>) =>{
          if (response.status === 200) {
            this.isLoadingButton.set(false);
            this.authenticationService.setAuth(response.body as ApiResponseModel);
            this._alertService.handleSuccess('Login Successfull');
            setTimeout(() => {
              if (this.authenticationService.user()?.user_role.name === 'admin') {
                this.router.navigate(['admin/']);
              } else {
                this.router.navigate(['home/']);
              }
            }, 2000);
          }
        }
      })
    )
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
}
