import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BarComponent } from "../../../shared/components/charts/bar/bar.component";

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    BarComponent
],
  template: `<div class="flex flex-row">
    <jlc-bar />
    <jlc-bar />

    <jlc-bar />
    <jlc-bar />

  </div>`,
  styleUrl: './analytics.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsComponent { }
