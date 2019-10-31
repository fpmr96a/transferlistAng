import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data.service';
import { Facility } from 'src/app/models/Facility';
import { FunctionalUnit } from 'src/app/models/FunctionalUnit';
import { JobClass } from 'src/app/models/JobClass';


@Component({
  selector: 'app-functional-unit-setup-dialog',
  templateUrl: './functional-unit-setup-dialog.component.html',
  styleUrls: ['./functional-unit-setup-dialog.component.scss']
})
export class FunctionalUnitSetupDialogComponent implements OnInit {
  facilityFormControl = new FormControl('', Validators.required);
  functionalUnitFormControl = new FormControl('', Validators.required);
  jobClassFormControl = new FormControl('', Validators.required);
  
  selectedFacility: string = "-1";
  selectedFunctionalUnit: string;
  selectedJobClass: string;
  
  facilities: Facility[] = [];
  functionalUnits: FunctionalUnit[] = [];
  jobClasses: JobClass[] = [];

  errorMessage = '';

  constructor(private dialogRef: MatDialogRef<FunctionalUnitSetupDialogComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dataService: DataService) { }  

  ngOnInit() {
    // Populate Job Classes Dropdown
    // =============================
    this. getJobClasses();
    
    // When an item in Job Class Dropdown selected, grab job class JSON string, load
    // JSON object, and populate code and description properties. Also populate the
    // Facility dropdown for job class selected and clear out the
    // Facility, functional unit selections, if present.
    // ==============================================================================
    this.jobClassFormControl.valueChanges.subscribe(
      value => {
        this.selectedJobClass = value;
       
        this.resetFacility();
        this.resetFunctionalUnit();
        
        this.getFacilities(this.selectedJobClass);
                     
      }
    );
    
   

    // When an item in the Facility Dropdown selected, grab facility code and call
    // web api to get Functional Units.
    // ==============================================================================
    this.facilityFormControl.valueChanges.subscribe(
      value => {
        this.selectedFacility = value;
        this.getFunctionalUnits(this.selectedFacility, this.selectedJobClass);
        
      }
    );

    // When an item in the Functional Unit dropdown selected, grab chrtFld_deptID
    // ==========================================================================
    this.functionalUnitFormControl.valueChanges.subscribe(
      value => {
        this.selectedFunctionalUnit = value;
      }
    );
  }

  getJobClasses() {
    // Populate Job Classes Dropdown
    // =============================
    this.dataService.getJobClasses().subscribe(
      jobclasses => {
        this.jobClasses = jobclasses;
        
        console.log("Filtered Job classes Returned" + JSON.stringify(this.jobClasses));
      },
      error => this.errorMessage = <any>error
    ); 

  }

  getFacilities(jobcode: string) {
    console.log('getFacilities entered with job code of ' + jobcode);
    this.dataService.getTransferFacilityByJobcode(jobcode).subscribe(
      returnedFacilities => {
        this.facilities = returnedFacilities;
        console.log("facilities Returned" + JSON.stringify(this.facilities));
      },
      error => this.errorMessage = <any>error
    );

  }


  getFunctionalUnits(facility: string, jobcode: string) {
    this.dataService.getFunctionalUnitByFacilityByJobcode(this.selectedFacility, this.selectedJobClass).subscribe(
      returnedFuntionalUnits => {
        this.functionalUnits = returnedFuntionalUnits;
        console.log("Functional Units Returned" + JSON.stringify(this.functionalUnits));
      },
      error => this.errorMessage = <any>error
    ); 
  }

  
  saveFunctionalUnits(jobClass: string, facility: string, functionalUnit: string): void {

  }

  resetAll(): void {
   
    this.resetJobClass();
    this.resetFacility();
    this.resetFunctionalUnit();

  }

  resetJobClass(): void {
    this.jobClassFormControl.setValue('');

  }

  resetFacility(): void {
    this.selectedFacility = '';
    this.facilities = [];
   }

   resetFunctionalUnit(): void {
    this.selectedFunctionalUnit = '';
    this.functionalUnits = [];
    
   }

   stringifyJobClassObject(selectedJobClass: any): string {
    return JSON.stringify(selectedJobClass);
   }

  onSaveComplete() {
    console.log('ARRIVED at onSaveComplete');
    this.dialogRef.close();
    this.snackBar.open('Transfer List(s) created for ' + this.data.jobclassDescription, 'Complete', {duration: 1500, }); 
  }

  closePopup(): void {
    this.dialogRef.close();
  }

}
