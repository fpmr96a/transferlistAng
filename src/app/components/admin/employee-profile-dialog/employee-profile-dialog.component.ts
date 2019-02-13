import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

import { EmployeeProfile } from '../../../models/EmployeeProfile'; 
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-employee-profile-dialog',
  templateUrl: './employee-profile-dialog.component.html',
  styleUrls: ['./employee-profile-dialog.component.scss']
})
export class EmployeeProfileDialogComponent implements OnInit {
  employeeProfileForm: FormGroup;

  employeeProfile: EmployeeProfile;
  //employeeProfile: EmployeeProfile = new EmployeeProfile();

  errorMessage = '';
  
  constructor(private dialogRef: MatDialogRef<EmployeeProfileDialogComponent>,
              public snackBar: MatSnackBar,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }  

  ngOnInit(): void {
    this.employeeProfileForm = this.fb.group({ 
      firstName: {value: '', disabled: true},
      lastName: {value: '', disabled: true},
      phone: ['', Validators.required],
      bilingual: '',
      languages: ''
     });

     this.dataService.getEmployeeProfile(this.data.userName).subscribe(
      returnedEmployeeProfile => {
        this.employeeProfile = returnedEmployeeProfile;
        this.employeeProfileForm.setValue({
          firstName: this.employeeProfile.firstName,
          lastName: this.employeeProfile.lastName,
          phone: this.employeeProfile.daytimePhoneNumber,
          languages: this.employeeProfile.languagesSpoken,
          bilingual: JSON.stringify(this.employeeProfile.bilingual)
        })
        //this.employeeProfileForm.controls.bilingual.setValue(JSON.stringify(this.employeeProfile.bilingual));
        console.log("Employee Profile Returned" + JSON.stringify(this.employeeProfile));
      },
      error => this.errorMessage = <any>error
    ); 
  }

  save() {
    this.dialogRef.close(this.employeeProfile);
    this.snackBar.open('Employee Profile Saved ...', 'Complete', {duration: 1500,
    });
  }

  dismiss() {
    this.dialogRef.close(null);
    this.snackBar.open('Employee Profile Changes Disgarded ...', '', {duration: 1500,
    });
  }

}
