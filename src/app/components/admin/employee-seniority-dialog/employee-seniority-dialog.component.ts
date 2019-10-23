import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/core/data.service';
import { Employee } from 'src/app/models/Employee';

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-employee-seniority-dialog',
  templateUrl: './employee-seniority-dialog.component.html',
  styleUrls: ['./employee-seniority-dialog.component.scss']
})
export class EmployeeSeniorityDialogComponent implements OnInit {
  employeeSearchForm: FormGroup;

  employees: Employee[] = [];

  displayedColumns: string[] = ['UserName', 'FirstName', 'LastName', 'Job_Code4', 'Seniority', 'Layoff_Sen_Dt_CORE', 'Layoff_Sen_Dt_Override' ];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  errorMessage: any;
  
  constructor(private dialogRef: MatDialogRef<EmployeeSeniorityDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }  

  ngOnInit() {
    this.employeeSearchForm = this.fb.group({ 
      searchName: ['', [Validators.required, Validators.minLength(2)]],
     });
  }

  searchEmployees() {
    var searchName = this.employeeSearchForm.controls["searchName"].value;
    console.log('name being searched for: ' + searchName);
    
    this.dataService.searchEmployees(searchName)
     .subscribe(
        employeesFound => {
          console.log("employees returned from service " + JSON.stringify(employeesFound));
          this.dataSource.data = employeesFound;
          this.dataSource.sort = this.sort;
          //this.isLoading=false;
        }, 
        error => this.errorMessage = <any>error
      
    );
  }

  closeClicked(): void {
    this.dialogRef.close();
  }

}
