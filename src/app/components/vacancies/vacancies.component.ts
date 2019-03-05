import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { DataService } from 'src/app/core/data.service';
import { JobClass } from 'src/app/models/JobClass';
import { Facility } from 'src/app/models/Facility';
import { FunctionalUnit } from 'src/app/models/FunctionalUnit';
import { Shift } from 'src/app/models/shift';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {
  jobClassFormControl = new FormControl('', Validators.required);
  facilityFormControl = new FormControl('', Validators.required);
  functionalUnitFormControl = new FormControl('', Validators.required);
  shiftFormControl = new FormControl('', Validators.required);
  ftptFormControl = new FormControl('');

  jobClasses: JobClass[] = [];
  selectedJobClass: JobClass;
  selectedJobClassDescription: string = 'Select Job Class';
  selectedJobClassCode: string;

  facilities: Facility[] = [];
  selectedFacility: Facility;
  selectedFacilityCode: string;
  selectedFacilityDescription: string = 'Select Facility';
  
  functionalUnits: FunctionalUnit[] = [];
  selectedFunctionalUnit: FunctionalUnit;
  selectedFunctionalUnitDescription: string = 'Select Functional Unit';
  selectedFunctionalUnitCode: string;

  shifts: Shift[] = [];
  selelectedShift: Shift;
  selectedShiftCode: string;
  selectedShiftDescription: string = 'Select Shift';

  selectedFTPT: string;

 
 


  isLoading = true;
  errorMessage = '';
  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.getJobClasses().subscribe(
      jobclasses => {
        this.jobClasses = jobclasses;
        this.isLoading=false;
        console.log("Filtered Job classes Returned" + JSON.stringify(this.jobClasses));
      },
      error => this.errorMessage = <any>error
    ); 
  
    // When an item in Job Class Dropdown selected, grab job class JSON string, load
    // JSON object, and populate code and description properties
    // ==============================================================================
    this.jobClassFormControl.valueChanges.subscribe(
      value => {
        this.selectedJobClass = JSON.parse(value);
        this.selectedJobClassDescription = this.selectedJobClass.description;
        this.selectedJobClassCode = this.selectedJobClass.code.toString();

        this.getFacilityAndShiftByJobclass(this.selectedJobClassCode);
        this.resetFacility();
        this.resetFunctionalUnit();
        this.resetShift();
        //this.isLoading=true;
      }
    );

    this.facilityFormControl.valueChanges.subscribe(
      value => {
        this.selectedFacility = JSON.parse(value);
        this.selectedFacilityDescription = this.selectedFacility.description;
        this.selectedFacilityCode = this.selectedFacility.code.toString();
       
        this.getFunctionalUnits(this.selectedFacilityCode, this.selectedJobClassCode);
        this.resetFunctionalUnit();
        this.resetShift();
        //this.isLoading=true;
      }
    );

    this.functionalUnitFormControl.valueChanges.subscribe(
      value => {
        this.selectedFunctionalUnit = JSON.parse(value);
        this.selectedFunctionalUnitDescription = this.selectedFunctionalUnit.description;
        this.selectedFunctionalUnitCode = this.selectedFunctionalUnit.chrtFld_Dept_ID.toString();
       
        this.resetShift();
        //this.isLoading=true;
      }
    );

    this.shiftFormControl.valueChanges.subscribe(
      value => {
        this.selelectedShift = JSON.parse(value);
        this.selectedShiftDescription = this.selelectedShift.description;
        this.selectedShiftCode = this.selelectedShift.code.toString();
       
        //this.isLoading=true;
      }
    );

    this.ftptFormControl.valueChanges.subscribe(
      value => {
        this.selectedFTPT = JSON.parse(value);
        console.log("Selected FT PT: " + this.selectedFTPT);
       // console.log("Selected property:" + this.ftptFormControl.)
      }
    )
  }

  getFacilityAndShiftByJobclass(selectedJobClass: string): void {
    this.dataService.getTransferFacilityByJobcode(selectedJobClass).subscribe(
      returnedFacilities => {
        this.facilities = returnedFacilities;
        console.log("facilities Returned" + JSON.stringify(this.facilities));
      },
      error => this.errorMessage = <any>error
    ); 

    this.dataService.getShiftByJobcode(selectedJobClass).subscribe(
      returnedShifts => {
        this.shifts = returnedShifts;
        console.log("shifts Returned" + JSON.stringify(this.shifts));
      },
      error => this.errorMessage = <any>error
    ); 
  }

  getFunctionalUnits(facility: string, jobcode: string) {
    this.dataService.getFunctionalUnitByFacilityByJobcode(facility, jobcode).subscribe(
      returnedFuntionalUnits => {
        this.functionalUnits = returnedFuntionalUnits;
        console.log("Functional Units Returned" + JSON.stringify(this.functionalUnits));
      }, 
      error => this.errorMessage = <any>error
      
    );
  }
  stringifyJobClassObject(selectedJobClass: any): string {
    return JSON.stringify(selectedJobClass);
   }
  
   stringifySelectObject(selectedItem: any): string {
    return JSON.stringify(selectedItem);
   }

   resetFacility(): void {
    this.selectedFacility = null;
    this.selectedFacilityCode = '';
    this.selectedFacilityDescription = 'Select Facility';
   }

   resetFunctionalUnit(): void {
    this.selectedFunctionalUnit = null;
    this.selectedFunctionalUnitDescription = 'Select Functional Unit';
    this.selectedFunctionalUnitCode = '';
   }

   resetShift(): void {
    this.selelectedShift = null;
    this.selectedShiftCode = '';
    this.selectedShiftDescription = 'Select Shift';
   }
}
