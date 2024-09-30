import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  template: `<footer class="bg-gray-800 text-gray-300 py-6">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2">
      <div class="w-1/2 mb-2">
        <!-- Address Section -->
        <div class="flex items-center space-x-4 mb-2">
          <svg-icon src="icons/home.svg" [svgClass]="'w-6 h-6 text-white'" />
          <p class="text-sm">
            152 President JP Laurel Highway, Brgy. BanayBanay II, San Jose,
            Batangas
          </p>
        </div>
        <!-- Phone Section -->
        <div class="flex items-center space-x-4">
          <svg-icon
            src="icons/phone.svg"
            svgClass="w-6 h-6 text-white"
          ></svg-icon>

          <p class="text-sm">(043) 774-1763 / 706-5163</p>
        </div>
      </div>

      <div class="w-1/2">
        <!-- Mobile Section -->
        <div class="flex items-center space-x-4 text-white mb-2">
          <svg-icon src="icons/mobile.svg" [svgClass]="'h-6 w-6'"> </svg-icon>

          <p class="text-sm">09065935785 / 09293238326 / 09622143028</p>
        </div>
        <!-- Email Section -->
        <div class="flex items-center space-x-4">
          <svg-icon src="icons/email.svg" [svgClass]="'h-6 w-6'"></svg-icon>
          <p class="text-sm">jlcalingasan2002&#64;gmail.com</p>
        </div>
      </div>
    </div>
    <!-- Copyright -->
    <div class="mt-6 text-center text-sm">
      © 2024 JL Calingasan Service Center. All rights reserved.
    </div>
  </footer> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
