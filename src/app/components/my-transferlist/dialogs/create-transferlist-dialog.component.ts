import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data.service';
import { Facility } from 'src/app/models/Facility';

@Component({
  selector: 'app-create-transferlist-dialog',
  templateUrl: './create-transferlist-dialog.component.html',
  styleUrls: ['./create-transferlist-dialog.component.scss']
})
export class CreateTransferlistDialogComponent implements OnInit {
  facilityFormControl = new FormControl('', Validators.required);
  functionalUnitFormControl = new FormControl('', Validators.required);
  shiftFormControl = new FormControl('', Validators.required);
  ftptFormControl = new FormControl('', Validators.required);

  selectedFacility: string;
  selectedFunctionalUnit: string;
  selectedShift: string;
  selectedFTPT: string;

  facilities: Facility[] = [];

  errorMessage = '';


  constructor(private dialogRef: MatDialogRef<CreateTransferlistDialogComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }  

  ngOnInit() {
    this.dataService.getTransferFacilityByJobcode(this.data.jobCode4).subscribe(
      returnedFacilities => {
        this.facilities = returnedFacilities;
        console.log("facilities Returned" + JSON.stringify(this.facilities));
      },
      error => this.errorMessage = <any>error
    ); 

    // When an item in Job Class Dropdown selected, grab job class JSON string, load
    // JSON object, and populate code and description properties
    // ==============================================================================
    /* this.jobClassFormControl.valueChanges.subscribe(
      value => {
        this.selectedJobClass = JSON.parse(value);
        this.selectedJobClassDescription = this.selectedJobClass.description;
        this.selectedJobClassCode = this.selectedJobClass.code;
        this.GetMyTransferListByJobCode(this.selectedJobClassCode);
      }
    ); */
  }

  createTransferlists(): void {

  }

  noClicked(): void {
    this.dialogRef.close();
  }
}
