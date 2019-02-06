import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data.service';
import { Facility } from 'src/app/models/Facility';
import { FunctionalUnit } from 'src/app/models/FunctionalUnit';

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

  selectedFacility: string = "-1";
  selectedFunctionalUnit: string;
  selectedShift: string;
  selectedFTPT: string;

  facilities: Facility[] = [];
  functionalUnits: FunctionalUnit[] = [];

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

    this.getFunctionalUnits('-1', this.data.jobCode4);
    /* this.dataService.getFunctionalUnitByFacilityByJobcode(this.selectedFacility,this.data.jobCode4).subscribe(
      returnedFuntionalUnits => {
        this.functionalUnits = returnedFuntionalUnits;
        console.log("Functional Units Returned" + JSON.stringify(this.functionalUnits));
      },
      error => this.errorMessage = <any>error
    );  */

    // When an item in Job Class Dropdown selected, grab job class JSON string, load
    // JSON object, and populate code and description properties
    // ==============================================================================
    this.facilityFormControl.valueChanges.subscribe(
      value => {
        this.selectedFacility = value;
        this.getFunctionalUnits(this.selectedFacility, this.data.jobCode4);
        
      }
    );
  }

  getFunctionalUnits(facility: string, jobcode: string) {
    this.dataService.getFunctionalUnitByFacilityByJobcode(this.selectedFacility,this.data.jobCode4).subscribe(
      returnedFuntionalUnits => {
        this.functionalUnits = returnedFuntionalUnits;
        console.log("Functional Units Returned" + JSON.stringify(this.functionalUnits));
      },
      error => this.errorMessage = <any>error
    ); 
  }


  createTransferlists(): void {

  }

  noClicked(): void {
    this.dialogRef.close();
  }
}
