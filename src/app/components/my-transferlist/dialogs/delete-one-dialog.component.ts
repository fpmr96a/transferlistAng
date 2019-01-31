import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-delete-one-dialog',
  templateUrl: './delete-one-dialog.component.html',
  styleUrls: ['./delete-one-dialog.component.scss']
})
export class DeleteOneDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteOneDialogComponent>,
    public snackBar: MatSnackBar) {

}

  ngOnInit() {
  }

}
