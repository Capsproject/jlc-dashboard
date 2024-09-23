import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AboutComponent, ServicesComponent, FooterComponent, NavbarComponent],
  template: `
    <app-navbar />
    <app-about />
    <app-services />
    <app-footer />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
