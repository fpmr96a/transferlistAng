import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-employee-seniority-dialog',
  templateUrl: './employee-seniority-dialog.component.html',
  styleUrls: ['./employee-seniority-dialog.component.scss']
})
export class EmployeeSeniorityDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EmployeeSeniorityDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }  

  ngOnInit() {
  }

}
