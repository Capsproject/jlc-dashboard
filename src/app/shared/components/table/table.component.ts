import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  template: `<div class="mb-4 flex justify-between">
    <div class="inline-block">
    <h3 class="font-semibold text-foreground">Team Members</h3>
    <div class="space-x-1 text-xs font-medium text-muted-foreground">
      <a href="" class="hover:text-primary">All Members:</a>
      <span class="text-foreground">49,053</span>
    </div>
  </div>
  <div class="inline-block space-x-4">
    <button
      class="flex-none rounded-md bg-muted px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground">
      Import CSV
    </button>
    <button class="flex-none rounded-md bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground">
      Add Member
    </button>
  </div>
  
  </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {}
