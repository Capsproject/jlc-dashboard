import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavbarComponent, BreadcrumbsComponent, RouterOutlet],
  template: `<div class="flex h-screen w-full overflow-hidden">
    <app-sidebar></app-sidebar>
    <div class="flex grow flex-col content-start overflow-hidden bg-card">
      <app-navbar />
      <div
        id="main-content"
        class="scrollbar-thumb-rounded scrollbar-track-rounded grow overflow-auto bg-white scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted"
      >
        <div class="mx-auto px-4 py-4 sm:px-8 lg:container">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  </div>`,
  styleUrl: './admin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {}
