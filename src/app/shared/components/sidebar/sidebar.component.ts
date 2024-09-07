import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { SvgIconComponent } from 'angular-svg-icon';
import packageJson from '../../../../../package.json';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SidebarMenuComponent, SvgIconComponent],
  template: `<nav
    [ngClass]="menuService.showSideBar ? 'w-52 xl:w-64' : 'w-[70px]'"
    class="scrollbar-thumb-rounded scrollbar-track-rounded hidden h-full flex-col justify-between overflow-auto bg-background pt-3 transition-all duration-300 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-card lg:flex"
  >
    <div class="px-4">
      <!-- Logo -->
      <div class="relative h-10">
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
    <!-- Version -->
    <a
      target="_blank"
      href="https://github.com/luciano-work/angular-tailwind"
      class="group flex h-9 cursor-pointer items-center justify-start rounded p-2 hover:bg-card">
      <svg-icon
        src="assets/icons/heroicons/outline/information-circle.svg"
        [svgClass]="'h-5 w-5 text-muted-foreground/50'">
      </svg-icon>

      <div class="ml-3 truncate text-[10px] font-semibold tracking-wide focus:outline-none">
        <span class="rounded-lg bg-primary/10 px-2 font-semibold text-primary">v{{ appJson.version }}</span>
      </div>

      <div class="fixed w-full" *ngIf="!menuService.showSideBar">
        <span
          class="z-1 absolute left-12 -top-4 w-auto min-w-max origin-left scale-0 rounded-md bg-foreground p-2 text-xs font-bold text-background shadow-md transition-all duration-200 group-hover:scale-100">
          v{{ appJson.version }}
        </span>
      </div>
    </a>
  </div>
  </nav> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  public readonly appJson = packageJson;
  public readonly menuService = inject(MenuService);

  public toggleSidebar(): void {
    this.menuService.toggleSidebar();
  }
}
