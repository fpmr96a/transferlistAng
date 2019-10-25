import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router'
import { MatDialog } from '@angular/material/dialog';
import { EmployeeProfileDialogComponent } from './components/admin/employee-profile-dialog/employee-profile-dialog.component';
import { EmployeeSeniorityDialogComponent } from './components/admin/employee-seniority-dialog/employee-seniority-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Transfer List';
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router, 
              public dialog: MatDialog) {
    this.navLinks = [
        {
            label: 'My Transfer List',
            link: './mytransferlist',
            index: 0
        }, {
            label: 'Transfer List',
            link: './filteredtransferlist',
            index: 1
        }, {
          label: 'Vacancies',
          link: './vacancy',
          index: 1
        }, {
            label: 'Reports',
            link: './reports',
            index: 1
         }, 
    ];
}
ngOnInit(): void {
  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
}

openEmployeeProfile(): void {
  
    let dialogRef = this.dialog.open(EmployeeProfileDialogComponent, {
        width: '450px',
        height: '470px',
        disableClose: true,
        data: {userName: 'ruggieroc'}
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
    });
  }
  
  openEmployeeSeniority(): void {
    console.log('entered OpenEmployeeSeniority');
    let dialogRef = this.dialog.open(EmployeeSeniorityDialogComponent, {
        width: '1100px',
        height: '800px',
        disableClose: true,
        data: {userName: 'ruggieroc'}
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
    });
  }
  
  deleteAll(): void{
    console.log('deleteAll clicked');
  }

}
