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
  emptyEmployeesList: Employee[] = [];
  selectedEmployee: Employee;
  selectedRowIndex: number = -1;
  

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
      searchName: '',
     });

     this.employeeSearchForm.controls["searchName"].valueChanges.subscribe( 
      value => {
        var nameToSearch = value;
        this.searchEmployees(nameToSearch);
              
        // Clear Grid for scenario where no last names found
        // =================================================
        this.dataSource.data = this.emptyEmployeesList;
       
      }
    );
  }

  

  searchEmployees(searchValue: string) {
    // var searchName = this.employeeSearchForm.controls["searchName"].value;
    console.log('name being searched for: ' + searchValue);
    
    this.dataService.searchEmployees(searchValue)
     .subscribe(
        employeesFound => {
          console.log("employees returned from service " + JSON.stringify(employeesFound));
          this.dataSource.data = employeesFound;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          //this.isLoading=false;
        }, 
        error => this.errorMessage = <any>error
      
    );
  }


updateSeniorityDate(updatedEmployee: Employee, revisedSeniorityDate: string) {
    console.log('revisedSeniorityDate is ' + revisedSeniorityDate + '  UpdatedEmployee is ' + JSON.stringify(updatedEmployee) );

    this.dataService.updateLayoffSeniorityDate(updatedEmployee.UserName, revisedSeniorityDate)
    .subscribe(
        (data: any) => this.onSaveComplete(),
        error => this.errorMessage = <any>error
     );
}

onSaveComplete() {
  console.log('ARRIVED at onSaveComplete');
  var searchName = this.employeeSearchForm.controls["searchName"].value;
  this.searchEmployees(searchName);
  //this.snackBar.open('Employee Profile Saved ...', 'Complete', {duration: 1500,
  //});
}

  closeClicked(): void {
    this.dialogRef.close();
  }

  highlight(row){
    this.selectedRowIndex = row.UserName;
    }

}
