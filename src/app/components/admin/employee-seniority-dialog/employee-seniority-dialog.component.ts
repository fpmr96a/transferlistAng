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
  selectedEmployee: Employee;
  selectedRowIndex: number;
  

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


//**** Left off here. This is actually updating.  Need to validate the date next ****** */
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
  this.searchEmployees();
  //this.snackBar.open('Employee Profile Saved ...', 'Complete', {duration: 1500,
  //});
}

  closeClicked(): void {
    this.dialogRef.close();
  }

  highlight(row){
    this.selectedRowIndex = row.id;
    }

}
