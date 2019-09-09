import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { DataService } from '../../core/data.service';

import { ReportList } from 'src/app/models/ReportList';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  jobClassFormControl = new FormControl('', Validators.required);
  selectedRowIndex: number;
  errorMessage = '';
  isLoading = true;

  
  selectedJobClassDescription: string;
  selectedJobClassCode: string;



  displayedColumns: string[] = ['reportDescription', 'singleButtonColumn'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
	  this.getReports();
        
  }

  highlight(row){
    this.selectedRowIndex = row.id;
    }


 
getReports() {
	const reportlist: ReportList[] = [
		{
		'reportID': 'rpt01',
		'reportDescription': 'This is report 1'
		},
		{
		'reportID': 'rpt02',
		'reportDescription': 'This is report 2'
		},
		{
		'reportID': 'rpt03',
		'reportDescription': 'This is report 3'
		}
	];
	this.dataSource.data = reportlist;
	this.isLoading=false; 
	}
 

 
}
