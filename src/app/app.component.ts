import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SnackbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'jlc-client';
}
