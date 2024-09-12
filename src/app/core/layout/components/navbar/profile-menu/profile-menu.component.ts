import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, AngularSvgIconModule, ClickOutsideDirective],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
  template: `
    <div class="relative ml-3">
      <!-- Profile Button -->
      <button
        (click)="toggleMenu()"
        class="relative flex rounded-full bg-card text-sm"
        type="button"
      >
        <span class="sr-only">Open user menu</span>
        <img
          clickOutside
          (clickOutside)="isOpen = false"
          class="h-9 w-9 rounded-md"
          src="https://avatars.githubusercontent.com/u/12519008?v=4"
          alt=""
        />
      </button>
      <!-- Dropdown -->
      <div
        [@openClose]="isOpen ? 'open' : 'closed'"
        class="absolute right-0 z-20 mt-2 w-60 origin-top-right transform rounded-md bg-background py-4 shadow-custom ring-1 ring-transparent ring-opacity-5 transition focus:outline-none"
      >
        <div class="flext-row flex items-center px-4 pb-4">
          <div class="w-10 shrink-0">
            <img
              class="rounded-md"
              src="https://avatars.githubusercontent.com/u/12519008?v=4"
              alt=""
            />
          </div>
          <div
            class="overflow-hidden px-2 text-sm font-semibold text-foreground"
          >
            Luciano Oliveira
            <p
              class="truncate text-ellipsis text-xs font-semibold text-muted-foreground"
            >
              me&#64;lanno.dev
            </p>
          </div>
        </div>

        <div class="border-b border-dashed border-border"></div>

        <ul class="my-2 mx-4 flex flex-col">
          @for (item of profileMenu; track $index) {
          <li
            routerLink="{{ item.link }}"
            :key="$index"
            class="inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-card hover:text-primary"
          >
            <svg-icon
              src="{{ item.icon }}"
              [svgClass]="'h-5 w-5 text-muted-foreground/50'"
            >
            </svg-icon>
            {{ item.title }}
          </li>
          }
        </ul>
        <hr class="border-dashed border-border" />
        <div class="mx-4 my-2">
          <span class="text-xs font-semibold text-foreground">Color</span>
          <div class="mt-2 grid grid-cols-2 gap-2">
            @for (item of themeColors; track $index) {
            <div
              :key="$index"
              class="focus-visible:ring-ring inline-flex h-8 cursor-pointer items-center justify-start whitespace-nowrap rounded-md border border-border bg-background px-3 text-xs font-medium text-muted-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 hover:bg-card hover:text-foreground"
            >
              <span
                [style.backgroundColor]="item.code"
                class="mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-rose-500"
              ></span>
              <p class="capitalize">{{ item.name }}</p>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './profile-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMenuComponent implements OnInit{
  public isOpen = false;
  public profileMenu = [
    {
      title: 'Your Profile',
      icon: './icons/heroicons/outline/user-circle.svg',
      link: '/profile',
    },
    {
      title: 'Settings',
      icon: './icons/heroicons/outline/cog-6-tooth.svg',
      link: '/settings',
    },
    {
      title: 'Log out',
      icon: './icons/heroicons/outline/logout.svg',
      link: '/auth',
    },
  ];

  public themeColors = [
    {
      name: 'base',
      code: '#e11d48',
    },
    {
      name: 'yellow',
      code: '#f59e0b',
    },
    {
      name: 'green',
      code: '#22c55e',
    },
    {
      name: 'blue',
      code: '#3b82f6',
    },
    {
      name: 'orange',
      code: '#ea580c',
    },
    {
      name: 'red',
      code: '#cc0022',
    },
    {
      name: 'violet',
      code: '#6d28d9',
    },
  ];

  public themeMode = ['light', 'dark'];

  // constructor(public themeService: ThemeService) {}

  ngOnInit(): void {}

  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  // toggleThemeMode() {
  //   this.themeService.theme.update((theme) => {
  //     const mode = !this.themeService.isDark ? 'dark' : 'light';
  //     return { ...theme, mode: mode };
  //   });
  // }

  // toggleThemeColor(color: string) {
  //   this.themeService.theme.update((theme) => {
  //     return { ...theme, color: color };
  //   });
  // }
}
