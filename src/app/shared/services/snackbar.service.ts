import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface SnackbarMessage {
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbarSubject = new Subject<SnackbarMessage>();
  snackbar$ = this.snackbarSubject.asObservable();

  open(message: string, duration: number = 3000) {
    console.log('SnackbarService: open()');
    this.snackbarSubject.next({ message, duration });

    // Auto-close snackbar after specified duration
    setTimeout(() => {
      this.snackbarSubject.next({ message: '', duration: 0 });
    }, duration);
  }
}
