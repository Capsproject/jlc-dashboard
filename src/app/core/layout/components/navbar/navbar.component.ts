import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuService } from '../../../../shared/services/menu.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, NavbarMenuComponent, ProfileMenuComponent, NavbarMobileComponent],
  template: ` <div class="relative bg-background">
    <div class="mx-auto px-5">
      <div class="flex items-center justify-between py-3.5 md:justify-start">
        <!-- Mobile Navigation Menu Button-->
        <div class="sm:order-1 md:hidden">
          <button
            (click)="toggleMobileMenu()"
            type="button"
            class="inline-flex items-center justify-center rounded-md bg-muted p-2 text-muted-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary hover:bg-muted-foreground hover:text-muted"
            aria-expanded="false"
          >
            <span class="sr-only">Open menu</span>
            <!-- Heroicon name: outline/menu -->
            <svg-icon
              src="icons/heroicons/outline/menu.svg"
              [svgClass]="'h-6 w-6'"
            >
            </svg-icon>
          </button>
        </div>

        <!-- Logo -->
        <div
          class="flex items-center justify-start sm:order-2 md:mr-10 lg:hidden"
        >
          <a
            class="flex items-center justify-center rounded bg-primary p-2 focus:outline-none focus:ring-1"
          >
            <svg-icon src="icons/logo.svg"></svg-icon>
          </a>
          <b class="hidden pl-3 text-sm font-bold text-foreground sm:block">
            Angular Tailwind
          </b>
        </div>

        <!-- Profile menu -->
        <div
          class="items-center justify-end sm:order-4 md:flex md:flex-1 lg:w-0"
        >
          <app-profile-menu></app-profile-menu>
        </div>
      </div>
    </div>
    <!-- Mobile menu -->
    <app-navbar-mobile></app-navbar-mobile>
  </div>`,
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly menuService = inject(MenuService);

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }
}
