import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-delete-all-dialog',
  templateUrl: './delete-all-dialog.component.html',
  styleUrls: ['./delete-all-dialog.component.scss']
})
export class DeleteAllDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteAllDialogComponent>,
              public snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { } 

  ngOnInit() {
  }

  deleteAllConfirmed(): void {
    // The [mat-dialog-close] attribute on the button automatically closes dialog, when clicked,
    // and returns the value 'true' to calling component.
    // NOTE: It is necessary to make the DELETE method in dataService an OBSERVABLE, even though
    //       nothing returned, and make the calling of this method SUBSCRIBE. Otherwise, the 
    //       delete will not happen. Calling the SUBSCRIBE triggers the execution. This is allowing
    //       for additional operations such as TAP before anything actually happens.
    // ===========================================================================================
    this.dataService.deleteAllTransferLists(this.data.userName, this.data.jobCode4, this.data.userName)
      .subscribe();
      this.snackBar.open('All Transfer Lists Deleted for ' + this.data.jobclassDescription, 'Complete', {duration: 1500, }); 
      console.log('deleteAllTransferLists   username: ' + this.data.userName + ' jobcode: ' + this.data.jobCode4);
  }

  noClicked(): void {
    this.dialogRef.close();
  }


}
