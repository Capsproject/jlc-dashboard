import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>add-button works!</p>`,
  styleUrl: './add-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddButtonComponent {
  
}
