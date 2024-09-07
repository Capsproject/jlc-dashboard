import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormvalidationService {
  private errorMessages: Record<string, (errorValue?: any) => string> = {
    required: () => 'This field is required',
    minlength: (errorValue: any) => `Minimum length is ${errorValue.requiredLength}`,
    maxlength: (errorValue: any) => `Maximum length is ${errorValue.requiredLength}`,
    email: () => 'Invalid email address'
    // Add more custom error messages here
  };

  public getErrorMessage(errors: ValidationErrors | null): string {
    if (errors) {
      for (const errorName in errors) {
        if (errors.hasOwnProperty(errorName)) {
          if (errorName === 'serverError') {
            return errors[errorName];
          }

          const getMessage = this.errorMessages[errorName];
          if (getMessage) {
            return getMessage(errors[errorName]);
          }
        }
      }
    }
    return '';
  }

}
