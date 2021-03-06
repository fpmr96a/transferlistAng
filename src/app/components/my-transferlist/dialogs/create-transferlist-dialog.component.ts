import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data.service';
import { Facility } from 'src/app/models/Facility';
import { FunctionalUnit } from 'src/app/models/FunctionalUnit';
import { Shift } from 'src/app/models/shift';

@Component({
  selector: 'app-create-transferlist-dialog',
  templateUrl: './create-transferlist-dialog.component.html',
  styleUrls: ['./create-transferlist-dialog.component.scss']
})
export class CreateTransferlistDialogComponent implements OnInit {
  facilityFormControl = new FormControl('', Validators.required);
  functionalUnitFormControl = new FormControl('', Validators.required);
  shiftFormControl = new FormControl('', Validators.required);
  ftptFormControl = new FormControl('');

  selectedFacility: string = "-1";
  selectedFunctionalUnit: string;
  selectedShift: string;
  selectedFTPT: string = "F";

  facilities: Facility[] = [];
  functionalUnits: FunctionalUnit[] = [];
  shifts: Shift[] = [];

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

    this.dataService.getShiftByJobcode(this.data.jobCode4).subscribe(
      returnedShifts => {
        this.shifts = returnedShifts;
        console.log("shifts Returned" + JSON.stringify(this.shifts));
      },
      error => this.errorMessage = <any>error
    ); 

    this.getFunctionalUnits('-1', this.data.jobCode4);
    
    // When an item in the Facility Dropdown selected, grab facility code and call
    // web api to get Functional Units.
    // ==============================================================================
    this.facilityFormControl.valueChanges.subscribe(
      value => {
        this.selectedFacility = value;
        this.getFunctionalUnits(this.selectedFacility, this.data.jobCode4);
        
      }
    );

    // When an item in the Functional Unit dropdown selected, grab chrtFld_deptID
    // ==========================================================================
    this.functionalUnitFormControl.valueChanges.subscribe(
      value => {
        this.selectedFunctionalUnit = value;
      }
    );

    // When an item in the Shift dropdown selected, grab shift code
    // =============================================================
    this.shiftFormControl.valueChanges.subscribe(
      value => {
        this.selectedShift = value;
      }
    );

    // When an item in the FT/PT dropdown selected, FT_PT code
    // ======================================================= 
    this.ftptFormControl.valueChanges.subscribe(
      value => {
        this.selectedFTPT = value;
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
    this.dataService.createTransferListEmployee(this.data.jobCode4, this.selectedFacility, this.selectedFunctionalUnit,
       this.selectedShift, this.selectedFTPT, 'faraclass', 'faraclass')
       .subscribe(
        (data: any) => this.onSaveComplete(),
        error => this.errorMessage = <any>error
    );

    
  }

  onSaveComplete() {
    console.log('ARRIVED at onSaveComplete');
    this.dialogRef.close();
    this.snackBar.open('Transfer List(s) created for ' + this.data.jobclassDescription, 'Complete', {duration: 1500, }); 
  }

  noClicked(): void {
    this.dialogRef.close();
  }

  cancelClicked(): void {
    this.dialogRef.close();
  }
}
