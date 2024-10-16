import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'jlc-image-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<div class="flex flex-col mt-2 mb-2">
    <label class="block text-xxs font-medium text-gray-600 mb-1">{{ label }}</label>
    <input
      type="file"
      (change)="onFileSelected($event)"
      class="block w-full rounded-lg py-[10px] px-3 font-normal text-xs bg-white text-gray-600 outline-none border border-solid border-gray-300 focus:border-gray-500 focus-visible:border-gray-500 hover:border-gray-500"
      [accept]="accept"
    />
  </div> `,
  styleUrl: './file-upload.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent {
  @Output() selectedFile = new EventEmitter<File>();
  @Input() label = 'Upload';
  @Input() accept = '/*';
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;

  imageUrl: string | ArrayBuffer | null = null;


  public get formControl(): FormControl {
    return this.formGroup.get(this.controlName) as FormControl;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl = reader.result; // Set the image URL for preview
        this.selectedFile.emit(file); // Emit the selected file to the parent
      };

      reader.readAsDataURL(file);
    }
  }
}
