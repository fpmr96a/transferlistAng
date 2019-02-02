import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-delete-one-dialog',
  templateUrl: './delete-one-dialog.component.html',
  styleUrls: ['./delete-one-dialog.component.scss']
})
export class DeleteOneDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteOneDialogComponent>,
              public snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }  

  ngOnInit() {
  }

  deleteConfirmed(): void {
    // The [mat-dialog-close] attribute on the button automatically closes dialog, when clicked,
    // and returns the value 'true' to calling component.
    // NOTE: It is necessary to make the DELETE method in dataService an OBSERVABLE, even though
    //       nothing returned, and make the calling of this method SUBSCRIBE. Otherwise, the 
    //       delete will not happen. Calling the SUBSCRIBE triggers the execution. This is allowing
    //       for additional operations such as TAP before anything actually happens.
    // ===========================================================================================
    this.dataService.deleteTransferList(this.data.userName, this.data.jobCode4, this.data.facility_ID,
                                        this.data.chrtFldDeptId, this.data.shiftCd, this.data.ft_PT_Code)
                                        .subscribe();
    this.snackBar.open('Transfer List Deleted ...', 'Complete', {duration: 1500, });                                        
  }

  noClicked(): void {
    this.dialogRef.close();
  }

}
