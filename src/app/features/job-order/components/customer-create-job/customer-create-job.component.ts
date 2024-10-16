import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'jlc-customer-create-job',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>customer-create-job works!</p>`,
  styleUrl: './customer-create-job.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerCreateJobComponent { }
