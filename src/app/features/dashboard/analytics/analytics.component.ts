import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>analytics works!</p>`,
  styleUrl: './analytics.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsComponent { }
