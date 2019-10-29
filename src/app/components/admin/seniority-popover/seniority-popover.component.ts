import { Component, OnInit, Input, Optional, Host  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SatPopover } from '@ncstate/sat-popover';
import { DateValidator} from 'src/app/components/utility/date-validator/date-validator.component';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-seniority-popover',
  templateUrl: './seniority-popover.component.html',
  styleUrls: ['./seniority-popover.component.scss']
})
export class SeniorityPopoverComponent implements OnInit {

@Input()
get value(): string { return this._value; }
set value(x: string) {
  this.seniorityDate = this._value = x;
}
private _value = '';

seniorityDate = '';

seniorityDateForm: FormGroup;

constructor(@Optional()
            @Host() 
            public popover: SatPopover,
            private fb: FormBuilder) {
              this.seniorityDateForm = this.fb.group({
                seniorityDateField: [this.seniorityDate, Validators.compose([DateValidator.dateValidator])]
              });
}

ngOnInit() {
  // subscribe to cancellations and reset form value
  /* if (this.popover) {
    this.popover.closed.pipe(filter(val => val == null))
      .subscribe(() => this.seniorityDate = this.value || '');
  } */
 // Initialize Seniority Date
 // =========================
 const format = 'MM-dd-yyyy';
 const myDate = this.seniorityDate;
 const locale = 'en-US';
 const formattedDate = formatDate(myDate, format, locale);
 this.seniorityDateForm.setValue({ seniorityDateField: formattedDate});
}

onSave() {
  if (this.popover) {

    // Format date to be saved in MM-DD-YYYY format (dashes)
    // ======================================================
    const format = 'MM-dd-yyyy';
    const myDate = this.seniorityDateForm.controls["seniorityDateField"].value;
    const locale = 'en-US';
    const newSeniorityDate = formatDate(myDate, format, locale);
    console.log('newSeniorityDate in popover when closing is ' + newSeniorityDate );
    this.popover.close(newSeniorityDate);
  }
}

onCancel() {
  if (this.popover) {
    this.popover.close();
  }
}
}