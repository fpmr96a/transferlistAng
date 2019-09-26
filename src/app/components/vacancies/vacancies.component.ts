import { Component, OnInit } from '@angular/core';

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { DataService } from '../../core/data.service';

import { Vacancy } from '../../models/Vacancy';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {

  vacancies: Vacancy[] = [];

  constructor() { }

  ngOnInit() {
  }

}