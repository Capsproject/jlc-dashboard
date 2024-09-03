import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,  ReactiveFormsModule
  ],
  template: ` <div class="flex h-screen bg-indigo-700">
  <div class="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
        <header>
          <img class="w-20 mx-auto mb-5" src="https://img.icons8.com/fluent/344/year-of-tiger.png" />
        </header>
        <form [formGroup]="loginForm" (ngSubmit)="handleLoginSubmit()">
          <div>
            <label class="block mb-2 text-indigo-500">Email</label>
            <input formControlName="email" class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="text" placeholder="Mark Lowel Montealto">
          </div>
          <div>
            <label class="block mb-2 text-indigo-500">Password</label>
            <input formControlName="password" class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="password" name="password">
          </div>
          <div>
            <button class="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit">Login</button>
          </div>
        </form>
        <footer>
          <a class="text-indigo-700 hover:text-pink-700 text-sm float-left" href="#">Forgot Password?</a>
          <a class="text-indigo-700 hover:text-pink-700 text-sm float-right" href="#">Create Account</a>
        </footer>
      </div>
</div>`,
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  private formBuilder = inject(FormBuilder);

  public loginForm !: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email:  [''],
      password: ['']
    });
  }

  handleLoginSubmit() {
    console.log(this.loginForm.value);
  }
}
