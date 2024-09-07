import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-job-order',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `<p>job-order works!</p>
    <app-table />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobOrderComponent {}
