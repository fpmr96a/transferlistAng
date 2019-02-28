import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {
  bordersControl = new FormControl();
  constructor(public dialog: MatDialog,
             public dataService: DataService) { }

  ngOnInit() {
  }

  
  

}
