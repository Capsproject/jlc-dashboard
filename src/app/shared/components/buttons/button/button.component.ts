import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  template: `<button type="{{ type }}" [ngClass]="buttonStyle" class="flex flex-row gap-1">
    @if(!loading) {
      <svg-icon src="icons/heroicons/outline/plus-circle.svg" svgClass="w-5 h-5" aria-hidden="true"></svg-icon>
    }
    @if(loading) {
    <div class="flex gap-1 justify-center">
      <div
        class="w-5 h-5 rounded-full animate-spin border-2 border-solid border-gray-50 border-t-purple-300 my-auto"
      ></div>
      {{ loadingText }}
    </div>
    } @else {
      {{ actionText }}
    }
  </button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit{
  @Input() actionText!: string;
  @Input() icon?: string;
  @Input() type!: 'button' | 'submit' | 'reset';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() buttonStyle!: 'primary' | 'danger' | 'disabled-button';
  @Input() loadingText?: string;
  @Output() action = new EventEmitter<void>();

  ngOnInit(): void {
    console.log(this.icon)
  }
  public onClick(): void {
    this.action.emit();
  }
}
