import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

class PasswordValidator {
  static crossPasswordValidator: ValidatorFn = (
    formGroupControl: AbstractControl<{ password: string; confirmPassword: string }>,
  ): ValidationErrors | null => {
    const password = formGroupControl.value?.password;
    const confirmPassword = formGroupControl.value?.confirmPassword;

    if (password !== confirmPassword) {
      return { crossPasswordValidator: true };
    }
    return null;
  };
}

export { PasswordValidator };
