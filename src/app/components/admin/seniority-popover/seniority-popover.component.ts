import { Component, OnInit, Input, Optional, Host  } from '@angular/core';
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

constructor(@Optional() @Host() public popover: SatPopover) { }

ngOnInit() {
  // subscribe to cancellations and reset form value
  if (this.popover) {
    this.popover.closed.pipe(filter(val => val == null))
      .subscribe(() => this.seniorityDate = this.value || '');
  }
}

onSave() {
  if (this.popover) {
    console.log('seniorityDate in popover when closing is ' + this.seniorityDate);
    this.popover.close(this.seniorityDate);
  }
}

onCancel() {
  if (this.popover) {
    this.popover.close();
  }
}
}