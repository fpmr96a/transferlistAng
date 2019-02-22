import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { DataService } from '../../core/data.service';

import { JobClass } from 'src/app/models/JobClass';
import { Facility } from 'src/app/models/Facility';
import { FunctionalUnit } from 'src/app/models/FunctionalUnit';
import { Shift } from 'src/app/models/shift';

@Component({
  selector: 'app-filtered-transferlist',
  templateUrl: './filtered-transferlist.component.html',
  styleUrls: ['./filtered-transferlist.component.scss']
})
export class FilteredTransferlistComponent implements OnInit {
  jobClassFormControl = new FormControl('', Validators.required);
  facilityFormControl = new FormControl('', Validators.required);
  functionalUnitFormControl = new FormControl('', Validators.required);
  shiftFormControl = new FormControl('', Validators.required);
  ftptFormControl = new FormControl('');

  jobClasses: JobClass[] = [];
  selectedJobClass: JobClass;
  selectedJobClassDescription: string;
  selectedJobClassCode: string;

  selectedFacility: string = "-1";
  selectedFunctionalUnit: string;
  selectedShift: string;
  selectedFTPT: string;

  facilities: Facility[] = [];
  functionalUnits: FunctionalUnit[] = [];
  shifts: Shift[] = [];

  isLoading = true;
  errorMessage = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
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
        this.selectedJobClassCode = this.selectedJobClass.code;

        this.getFunctionalUnits('-1', this.selectedJobClassCode);
       // *** TODO: problem - Need to reset the SHIFT when the job class changes. Figure this out.
        this.dataService.getTransferFacilityByJobcode(this.selectedJobClassCode).subscribe(
          returnedFacilities => {
            this.facilities = returnedFacilities;
            console.log("facilities Returned" + JSON.stringify(this.facilities));
          },
          error => this.errorMessage = <any>error
        ); 
    
        this.dataService.getShiftByJobcode(this.selectedJobClassCode).subscribe(
          returnedShifts => {
            this.shifts = returnedShifts;
            console.log("shifts Returned" + JSON.stringify(this.shifts));
          },
          error => this.errorMessage = <any>error
        ); 
    
       
        
        // When an item in the Facility Dropdown selected, grab facility code and call
        // web api to get Functional Units.
        // ==============================================================================
        this.facilityFormControl.valueChanges.subscribe(
          value => {
            this.selectedFacility = value;
            this.getFunctionalUnits(this.selectedFacility, this.selectedJobClassCode);
            
          }
        );
        //this.isLoading=true;
      }
    );
  }

  getFunctionalUnits(facility: string, jobcode: string) {
    this.dataService.getFunctionalUnitByFacilityByJobcode(this.selectedFacility,this.selectedJobClassCode).subscribe(
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

}
