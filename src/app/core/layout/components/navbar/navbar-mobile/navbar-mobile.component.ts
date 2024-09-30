import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MenuService } from '../../../../../shared/services/menu.service';
import { NavbarMobileMenuComponent } from './navbar-mobile-menu/navbar-mobile-menu.component';
import { SubMenuItem } from '../../../../models/menu.models.';

@Component({
  selector: 'app-navbar-mobile',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, NavbarMobileMenuComponent],
  template: `<div
    [ngClass]="
      menuService.showMobileMenu
        ? 'pointer-events-auto scale-100 animate-fade-in-up opacity-100 duration-200'
        : 'pointer-events-none scale-95 opacity-0 duration-100 ease-out'
    "
    class="absolute inset-x-0 top-1 z-10 origin-top-right transform p-2 transition md:hidden"
  >
    <div class="rounded-lg bg-white shadow-lg">
      <div class="pt-5 pb-6">
        <div class="flex items-center justify-between px-5">
          <div>
            <!-- Logo -->
            <div
              class="flex items-center justify-start sm:order-2 md:mr-10 lg:hidden"
            >
              <a
                class="flex items-center justify-center rounded bg-primary p-2 focus:outline-none focus:ring-1"
              >
                <svg-icon src="icons/logo.svg" />
              </a>
              <b class="pl-3 text-sm font-bold text-foreground">
                Angular Tailwind
              </b>
            </div>
          </div>
          <div class="-mr-2">
            <button
              (click)="toggleMobileMenu()"
              type="button"
              class="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-transform focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary hover:rotate-90 hover:bg-card hover:text-foreground"
            >
              <span class="sr-only">Close menu</span>
              <!-- Heroicon name: outline/x -->
              <svg-icon src="icons/heroicons/outline/x.svg"> </svg-icon>
            </button>
          </div>
        </div>
        <div
          class="scrollbar-thumb-rounded scrollbar-track-rounded max-h-[500px] overflow-y-auto px-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted"
        >
          <app-navbar-mobile-menu></app-navbar-mobile-menu>
        </div>
      </div>
    </div>
  </div>`,
  styleUrl: './navbar-mobile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarMobileComponent {
  public readonly menuService = inject(MenuService);
  public toggleMenu(subMenu: SubMenuItem) {
    this.menuService.toggleMenu(subMenu);
  }

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = false;
  }
}
