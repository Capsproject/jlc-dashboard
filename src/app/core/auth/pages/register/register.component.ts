import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex justify-center h-screen items-center">
      <div class="logo">
        <img src="images/jlc_logo.png" alt="Logo" />
      </div>
      <div class="login-form">

      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {}
