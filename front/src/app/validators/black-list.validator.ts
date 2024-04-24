import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const blackListValidator: ValidatorFn = (
  control
): ValidationErrors | null => {
  const blackList = new Set(['salad', 'carrot']);
  if (blackList.has(control.value)) {
    return { blackList: { tata: 345 } };
  }
  return null;
};
