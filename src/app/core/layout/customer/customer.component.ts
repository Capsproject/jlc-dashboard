import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  template: `<div class="flex h-screen w-full overflow-hidden">
    <app-sidebar></app-sidebar>
    <div
      id="main-content"
      class="scrollbar-thumb-rounded scrollbar-track-rounded grow overflow-auto bg-white scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted"
    >
      <div class="mx-auto px-4 py-4 sm:px-8 lg:container">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>`,
})
export class CustomerComponent {
}