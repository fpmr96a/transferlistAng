import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { EmployeeProfile } from '../../../models/EmployeeProfile'; 


@Component({
  selector: 'app-employee-profile-dialog',
  templateUrl: './employee-profile-dialog.component.html',
  styleUrls: ['./employee-profile-dialog.component.scss']
})
export class EmployeeProfileDialogComponent implements OnInit {

  employeeProfile: EmployeeProfile;
  constructor(private dialogRef: MatDialogRef<EmployeeProfileDialogComponent>,
              public snackBar: MatSnackBar) {
    
   }

  ngOnInit() {
    // this.employeeProfile = new EmployeeProfile();
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
