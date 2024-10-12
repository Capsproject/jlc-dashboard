import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarComponent } from '../../shared/components/calendar/calendar.component';

@Component({
  selector: 'jlc-calendar-page',
  standalone: true,
  imports: [CommonModule, CalendarComponent],
  template: `
    <div class="w-auto">
      <jlc-calendar />
    </div>
  `,
  styleUrl: './calendar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPage {}
