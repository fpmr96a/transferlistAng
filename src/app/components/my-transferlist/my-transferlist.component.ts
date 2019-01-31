import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'

import { DataService } from '../../core/data.service';
import { MyTransferList } from '../../models/MyTransferList';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { JobClass } from 'src/app/models/JobClass';

@Component({
  selector: 'app-my-transferlist',
  templateUrl: './my-transferlist.component.html',
  styleUrls: ['./my-transferlist.component.scss']
})
export class MyTransferlistComponent implements OnInit {
  jobClassFormControl = new FormControl('', Validators.required);
  selectedRowIndex: number;
  errorMessage = '';

  jobClasses: JobClass[] = [];
  selectedJobClass: JobClass;
  selectedJobClassDescription: string;
  selectedJobClassCode: string;

  filteredTransferLists: MyTransferList[] = [];

  displayedColumns: string[] = ['facilityShortDescription', 'functionalUnitDescription', 'shiftDescription', 'ft_PT_Description', 'deleteButtonColumn'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
   this.dataService.getJobClasses().subscribe(
      jobclasses => {
        this.jobClasses = jobclasses;
        console.log("Job classes Returned" + JSON.stringify(this.jobClasses));
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
        this.GetMyTransferListByJobCode(this.selectedJobClassCode);
      }
    );

    //this.dataSource.paginator = this.paginator;

    // Initialize Grid as empty with message about nothing found
    // ==========================================================
    this.GetMyTransferListByJobCode("0000");
         
  }

  highlight(row){
    this.selectedRowIndex = row.id;
    }

GetMyTransferListByJobCode(jobcode: string) {
      this.dataService.getMyTransferListByJobcode(jobcode).subscribe(
        mytransferlists => {
          this.dataSource.data = mytransferlists;
          this.dataSource.sort = this.sort;
  
        },
        error => this.errorMessage = <any>error
      );
    }
  
  deleteTransferList(){

  }
 stringifyJobClassObject(selectedJobClass: any): string {
   return JSON.stringify(selectedJobClass);
  }
  /* public dataStateChange(state: DataStateChangeEvent): void {
      this.state = state;
      this.gridData = process(this.MyTransferLists, this.state);
  }
 */
}
