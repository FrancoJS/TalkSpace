import { AbstractControl, ValidationErrors } from '@angular/forms';

class EmailValidator {
  static emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (control.value && !emailRegex.test(control.value)) {
      return { emailValidator: true };
    }
    return null;
  }
}

export { EmailValidator };
