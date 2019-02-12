import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { EmployeeProfile } from '../../../models/EmployeeProfile'; 


@Component({
  selector: 'app-employee-profile-dialog',
  templateUrl: './employee-profile-dialog.component.html',
  styleUrls: ['./employee-profile-dialog.component.scss']
})
export class EmployeeProfileDialogComponent implements OnInit {
  employeeProfileForm: FormGroup;

  employeeProfile: EmployeeProfile;
  //employeeProfile: EmployeeProfile = new EmployeeProfile();

  constructor(private dialogRef: MatDialogRef<EmployeeProfileDialogComponent>,
              public snackBar: MatSnackBar) {
    
   }

  ngOnInit(): void {
    this.employeeProfileForm = new FormGroup({ 
      firstName: new FormControl(),
      lastName: new FormControl(),
      phone: new FormControl(),
      bilingual: new FormControl(false),
      languages: new FormControl()
     });
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
