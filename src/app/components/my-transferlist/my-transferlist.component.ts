import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { DataService } from '../../core/data.service';
import { MyTransferList } from '../../models/MyTransferList';

import { JobClass } from 'src/app/models/JobClass';

import { DeleteAllDialogComponent } from './dialogs/delete-all-dialog.component';
import { DeleteOneDialogComponent } from './dialogs/delete-one-dialog.component';
import { CreateTransferlistDialogComponent } from './dialogs/create-transferlist-dialog.component';

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

  displayedColumns: string[] = ['facilityShortDescription', 'functionalUnitDescription', 'shiftDescription', 'ft_PT_Description', 'addedToListDateTime', 'deleteButtonColumn'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService,
               public dialog: MatDialog) { }

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
  
  deleteTransferList(userName: string, jobCode4: string, facility_ID: number, 
                     chrtFldDeptId: string, shiftCd: string, ft_PT_Code: string ){
    console.log('clicked delete button' + ' jobcode: ' + jobCode4 + ' chrtFldDeptId: ' + chrtFldDeptId + ' facility_ID: ' + facility_ID + ' shiftCd: ' + shiftCd + ' ft_PT_Code: ' + ft_PT_Code);
    let dialogRef = this.dialog.open(DeleteOneDialogComponent, {
      width: '500px',
      height: '235px',
      disableClose: true,
      data: {userName: userName, jobCode4: jobCode4, facility_ID: facility_ID, chrtFldDeptId: chrtFldDeptId, shiftCd: shiftCd, ft_PT_Code: ft_PT_Code}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
          
        // Refresh the grid, for currently selected job class.
        // =================================================== 
        this.GetMyTransferListByJobCode(this.selectedJobClassCode);
      }
      
    });
  }

  deleteAllTransferLists(userName: string, jobCode4: string){
    
    let dialogRef = this.dialog.open(DeleteAllDialogComponent, {
    width: '500px',
    height: '275px',
    disableClose: true,
    data: {userName: userName, jobCode4: jobCode4, jobclassDescription: this.selectedJobClassDescription}
  });

    dialogRef.afterClosed().subscribe(result => {
    if (result === true) {

    // Refresh the grid, for currently selected job class.
    // =================================================== 
    this.GetMyTransferListByJobCode(this.selectedJobClassCode);
    }

  });
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
