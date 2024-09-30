import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  template: `<section class="py-12">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-semibold">Our Services</h2>
    </div>

    <div class="flex justify-center space-x-4">
      <!-- Service 1: Installation -->
      <div
        class="flex flex-col items-center space-y-2 border border-gray-400 p-6 rounded-md shadow-md"
      >
        <svg-icon src="icons/tools.svg" [svgClass]="'w-12 h-12'" />
        <p class="text-lg font-medium">Installation</p>
      </div>

      <!-- Service 2: Repair -->
      <div
        class="flex flex-col items-center space-y-2 border border-gray-400 p-6 rounded-md shadow-md"
      >
      <svg-icon src="icons/toolbox.svg" svgClass="w-12 h-12" />

        <p class="text-lg font-medium">Repair</p>
      </div>

      <!-- Service 3: Cleaning -->
      <div
        class="flex flex-col items-center space-y-2 border border-gray-400 p-6 rounded-md shadow-md"
      >
      <svg-icon src="icons/cleaning.svg" svgClass="w-12 h-12" />

        <p class="text-lg font-medium">Cleaning</p>
      </div>

      <!-- Service 4: Maintenance -->
      <div
        class="flex flex-col items-center space-y-2 border border-gray-400 p-6 rounded-md shadow-md"
      >
        <svg-icon src="icons/settings.svg" svgClass="w-12 h-12" />
        <p class="text-lg font-medium">Maintenance</p>
      </div>
    </div>
  </section> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {}
