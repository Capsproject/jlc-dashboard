import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { SvgIconComponent } from 'angular-svg-icon';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SidebarMenuComponent, SvgIconComponent],
  template: `<nav
    [ngClass]="menuService.showSideBar ? 'w-52 xl:w-64' : 'w-[70px]'"
    class="border-r-2 scrollbar-thumb-rounded scrollbar-track-rounded hidden h-full drop-shadow-lg flex-col justify-between overflow-auto bg-background pt-3 transition-all duration-300 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-card lg:flex"
  >
    <div class="px-4">
      <!-- Logo -->
      <div class="relative h-12">
        <div class="flex items-center" *ngIf="menuService.showSideBar">
          <a
            (click)="toggleSidebar()"
            class="flex cursor-pointer items-center justify-center rounded p-2 focus:outline-none focus:ring-1"
          >
            <svg-icon src="icons/jlc-logo.svg"> </svg-icon>
          </a>
          <b class="ml-1 pl-2 text-sm font-bold text-foreground">
            JLC APP
          </b>
        </div>
        <button
          (click)="toggleSidebar()"
          class="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded text-muted-foreground/50 transition-all duration-200 focus:outline-none hover:text-muted-foreground"
          [ngClass]="{ 'rotate-180': !menuService.showSideBar }"
        >
          <svg-icon src="icons/heroicons/solid/chevron-double-left.svg">
          </svg-icon>
        </button>
      </div>
      <!-- Menu Items -->
      <app-sidebar-menu></app-sidebar-menu>
    </div>
    <div class="mx-4 my-4 space-y-1">
  </div>
  </nav> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  public readonly menuService = inject(MenuService);

  public toggleSidebar(): void {
    this.menuService.toggleSidebar();
  }
}
