import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { DataService } from '../../core/data.service';

import { JobClass } from 'src/app/models/JobClass';

@Component({
  selector: 'app-filtered-transferlist',
  templateUrl: './filtered-transferlist.component.html',
  styleUrls: ['./filtered-transferlist.component.scss']
})
export class FilteredTransferlistComponent implements OnInit {
  jobClassFormControl = new FormControl('', Validators.required);

  jobClasses: JobClass[] = [];
  selectedJobClass: JobClass;
  selectedJobClassDescription: string;
  selectedJobClassCode: string;


  errorMessage = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
   this.dataService.getJobClasses().subscribe(
      jobclasses => {
        this.jobClasses = jobclasses;
        //this.isLoading=false;
        console.log("Filtered Job classes Returned" + JSON.stringify(this.jobClasses));
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
        
        //this.isLoading=true;
      }
    ); */
  }

  stringifyJobClassObject(selectedJobClass: any): string {
    return JSON.stringify(selectedJobClass);
   }

}
