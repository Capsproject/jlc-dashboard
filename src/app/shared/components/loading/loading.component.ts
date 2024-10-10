import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<div class="flex justify-center">
    <img src="images/jlc_logo.png" alt="loading" class="animate-ping w-20"/>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent { }
