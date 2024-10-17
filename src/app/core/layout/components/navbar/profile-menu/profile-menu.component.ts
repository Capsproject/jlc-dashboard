import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AngularSvgIconModule,
  ],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        })
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
        class="relative flex rounded-full text-sm"
        type="button"
      >
        <span class="sr-only">Open user menu</span>
        <img
          class="h-9 w-9 rounded-md"
          src="https://avatars.githubusercontent.com/u/12519008?v=4"
          alt=""
        />
      </button>
      <!-- Dropdown -->
      <div
        [@openClose]="isOpen ? 'open' : 'closed'"
        class="absolute right-0 z-20 mt-2 w-60 origin-top-right transform rounded-md bg-white drop-shadow-lg text-gray-800 py-4 shadow-custom ring-1 ring-transparent ring-opacity-5 transition focus:outline-none"
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
            {{ auth.userInfo.name }}
            <p
              class="truncate text-ellipsis text-xs font-semibold text-muted-foreground"
            >
              {{ auth.userInfo.email }}
            </p>
          </div>
        </div>

        <div class="border-b border-dashed border-border"></div>

        <ul class="my-2 mx-4 flex flex-col">
          @for (item of profileMenu; track $index) {
          <li
            (click)="handleClickMenu(item.click)"
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
      </div>
    </div>
  `,
  styleUrl: './profile-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMenuComponent implements OnInit {
  private readonly router = inject(Router);
  public readonly auth = inject(AuthService);
  public isOpen = false;
  public profileMenu = [
    // {
    //   title: 'Your Profile',
    //   icon: './icons/heroicons/outline/user-circle.svg',
    //   click: 0,
    // },
    // {
    //   title: 'Settings',
    //   icon: './icons/heroicons/outline/cog-6-tooth.svg',
    //   click: 1,
    // },
    {
      title: 'Log out',
      icon: './icons/heroicons/outline/logout.svg',
      click: 2,
    },
  ];

  ngOnInit(): void {}

  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  public handleClickMenu(i: number) {
    if (i === 1) {
      this.router.navigate(['/settings']);
    } else if (i === 2) {
      this.auth.logout();
    } else if (i === 0) {
      this.router.navigate(['/profile']);
    }
  }
}
