import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuService } from '../../../../../shared/services/menu.service';

@Component({
  selector: 'app-navbar-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="dropdown relative inline-block"
      *ngFor="let menu of menuService.pagesMenu"
    >
      <!-- Button -->
      <button
        [ngClass]="
          menu.selected || menu.active
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground/50 hover:bg-card hover:text-muted-foreground '
        "
        class="mr-2 inline-flex rounded-md px-3 py-2 text-sm font-medium"
      >
        <span>{{ menu.group }}</span>
      </button>
      <!-- Dropdown  -->
      <div
        class="dropdown-content absolute top-[100%] min-w-[200px] origin-top-left"
        navbar-submenu
      ></div>
    </div>
  `,
  styleUrl: './navbar-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarMenuComponent {
  private hideMenuClass = ['scale-95', 'animate-fade-out-down', 'opacity-0', 'pointer-events-none'];
  private showMenuClass = ['scale-100', 'animate-fade-in-up', 'opacity-100', 'pointer-events-auto'];

  public readonly menuService = inject(MenuService);

  

}
