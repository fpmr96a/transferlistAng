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
  }

  stringifyJobClassObject(selectedJobClass: any): string {
    return JSON.stringify(selectedJobClass);
   }
  

}
