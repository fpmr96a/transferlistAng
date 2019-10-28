import { Component, OnInit, Input, Optional, Host  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-seniority-popover',
  templateUrl: './seniority-popover.component.html',
  styleUrls: ['./seniority-popover.component.scss']
})
export class SeniorityPopoverComponent implements OnInit {
/** Overrides the comment and provides a reset value when changes are cancelled. */
@Input()
get value(): string { return this._value; }
set value(x: string) {
  this.seniorityDate = this._value = x;
}
private _value = '';

/** Form model for the input. */
seniorityDate = '';

seniorityDateForm: FormGroup;

constructor(@Optional()
            @Host() 
            public popover: SatPopover,
            private fb: FormBuilder) {
              this.seniorityDateForm = this.fb.group({
                seniorityDateField: [this.seniorityDate, Validators.compose([Validators.required])]
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
 this.seniorityDateForm.setValue({ seniorityDateField: this.seniorityDate});
}

onSave() {
  if (this.popover) {
    var newSeniorityDate = this.seniorityDateForm.controls["seniorityDateField"].value;
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