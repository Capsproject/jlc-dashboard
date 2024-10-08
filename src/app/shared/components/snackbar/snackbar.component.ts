import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    *ngIf="show"
    class="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded shadow-lg transition-transform transform"
    [ngClass]="{ 'translate-y-0': show, 'translate-y-20': !show }"
  >
    {{ message }}
  </div>`,
  styleUrl: './snackbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
  message: string = '';
  show: boolean = false;
  private readonly snackbarService = inject(SnackbarService);
  ngOnInit() {
    this.snackbarService.snackbar$.subscribe(snackbar => {
      if (snackbar.message) {
        this.message = snackbar.message;
        this.show = true;

        // Hide snackbar after duration
        setTimeout(() => {
          this.show = false;
        }, snackbar.duration || 3000);
      }
    });
  }
}
