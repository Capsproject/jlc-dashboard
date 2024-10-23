import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `<header>
    <nav
      class="
       flex flex-wrap
       items-center
       justify-between
       w-full
       py-4
       md:py-0
       px-4
       text-lg text-gray-700
       bg-white
     "
    >
      <div class="flex items-center gap-1 flex-wrap mt-1">
        <img src="images/jlc_logo.png" class="w-20 py-4 h-auto">
        <h1 class="text-xl font-bold pl-4 text-gray-800 max-sm:hidden md:hidden sm:hidden lg:block">J.L Calingasan Service Center</h1>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="menu-button"
        class="h-6 w-6 cursor-pointer md:hidden block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>

      <div class="hidden w-full md:flex md:items-center md:w-auto" id="menu">
        <ul
          class="
           pt-4
           text-base text-gray-700
           md:flex
           md:justify-between
           md:pt-0"
        >
          <li>
            <a class="md:p-4 py-2 block hover:text-green-400" href="#"
              >Home</a
            >
          </li>
          <li>
            <a class="md:p-4 py-2 block hover:text-green-400" href="#"
              >About</a
            >
          </li>
          <li>
            <a class="md:p-4 py-2 block hover:text-green-400" href="#"
              >Service</a
            >
          </li>
          <li>
            <a
              class="md:p-4 py-2 block hover:text-green-600 text-green-00"
              [routerLink]="['/auth/register']" routerLinkActive="router-link-active"
              >Sign Up</a
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {}
