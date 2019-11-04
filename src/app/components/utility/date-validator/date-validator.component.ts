import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export class DateValidator {
  static dateValidator(AC: AbstractControl) {
    if (AC && AC.value && AC.value.trim() == "") {
        return { 'dateValidator': true };
    }
    if (AC && AC.value && 
      !moment(AC.value, 'MM-DD-YYYY', true).isValid() && !moment(AC.value, 'MM/DD/YYYY', true).isValid() ) {
        return { 'dateValidator': true };
    }
    return null;
  }
}
