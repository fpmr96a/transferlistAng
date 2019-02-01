import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-delete-all-dialog',
  templateUrl: './delete-all-dialog.component.html',
  styleUrls: ['./delete-all-dialog.component.scss']
})
export class DeleteAllDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteAllDialogComponent>,
    public snackBar: MatSnackBar) {

}

  ngOnInit() {
  }

  deleteAllConfirmed(): void {
    this.dialogRef.close();
  }

  noClicked(): void {
    this.dialogRef.close();
  }


}
