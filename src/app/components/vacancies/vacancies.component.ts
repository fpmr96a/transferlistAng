import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { DataService } from '../../core/data.service';

import { Vacancy } from '../../models/Vacancy';
import { JobClass } from 'src/app/models/JobClass';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {
  jobClassFormControl = new FormControl('', Validators.required);
  selectedRowIndex: number;
  errorMessage = '';
  isLoading = true;

  jobClasses: JobClass[] = [];
  selectedJobClass: JobClass;
  selectedJobClassDescription: string;
  selectedJobClassCode: string;

  vacancies: Vacancy[] = [];
  displayedColumns: string[] = ['pcn', 'facilityShortDescription', 'functionalUnitDesc', 'approvalDateVMS', 'shiftDesc', 'hours', 'ftPT','createDt'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getJobClasses().subscribe(
       jobclasses => {
         this.jobClasses = jobclasses;
         this.isLoading=false;
         console.log("Job classes Returned" + JSON.stringify(this.jobClasses));
       },
       error => this.errorMessage = <any>error
     ); 
 
     // When an item in Job Class Dropdown selected, grab job class JSON string, load
     // JSON object, and populate code and description properties
     // ==============================================================================
     this.jobClassFormControl.valueChanges.subscribe(
       value => {
         console.log('selected job code is: ' + value);
         if (value.trim() == "")
         {
           this.selectedJobClassDescription = "";
           this.selectedJobClassCode = "";
           this.GetClosedVacanciesByJobCode("0000");  /* Clear grid if Job Code not selected */
         }
         else
         {
         this.selectedJobClass = JSON.parse(value);
         this.selectedJobClassDescription = this.selectedJobClass.description;
         this.selectedJobClassCode = this.selectedJobClass.code;
         this.GetClosedVacanciesByJobCode(this.selectedJobClassCode);
         this.isLoading=true;
         }
 
         
         
       }
     );
   }

   stringifyJobClassObject(selectedJobClass: any): string {
    return JSON.stringify(selectedJobClass);
   }

   GetClosedVacanciesByJobCode(jobcode: string) {
    this.dataService.getClosedVacancies('10', jobcode).subscribe(
      closedVacancies => {
        this.dataSource.data = closedVacancies;
        this.dataSource.sort = this.sort;
        this.isLoading=false;
      },
      error => this.errorMessage = <any>error
    );
  }

}