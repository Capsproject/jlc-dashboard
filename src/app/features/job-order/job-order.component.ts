import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-job-order',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `<p>job-order works!</p>
    <!-- <app-table [data$]="data" /> -->
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobOrderComponent implements OnInit {
  public data!: Observable<any>;

  ngOnInit(): void {
    this.data = of([
      {
        id: 1,
        body: 'First Item',
        severity: 1,
        status: 0,
      },
      {
        id: 2,
        body: 'Second Item',
        severity: 2,
        status: 1,
      },
    ]);
  }
}
