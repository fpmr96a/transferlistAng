import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'

import { DataService } from '../../core/data.service';
import { MyTransferList } from '../../models/MyTransferList';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-my-transferlist',
  templateUrl: './my-transferlist.component.html',
  styleUrls: ['./my-transferlist.component.scss']
})
export class MyTransferlistComponent implements OnInit {
  jobClassFormControl = new FormControl('', Validators.required);
  selectedRowIndex: number;
  errorMessage = '';

  filteredTransferLists: MyTransferList[] = [];

  displayedColumns: string[] = ['facility_Short_Description', 'functionalUnitDescription', 'shiftDescription', 'fT_PT_Description'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
   /*  this.dataService.getToDos().subscribe(
      todos => {
        this.ToDos = todos;
      },
      error => this.errorMessage = <any>error
    );

    this.jobClassFormControl.valueChanges.subscribe(
      value => console.log(value)
    ); */

    //this.dataSource.paginator = this.paginator;

    this.dataService.getMyTransferList().subscribe(
      mytransferlists => {
        this.dataSource.data = mytransferlists;
        this.dataSource.sort = this.sort;

      },
      error => this.errorMessage = <any>error
    );
     
  }

  highlight(row){
    this.selectedRowIndex = row.id;
    }
  
  /* public dataStateChange(state: DataStateChangeEvent): void {
      this.state = state;
      this.gridData = process(this.MyTransferLists, this.state);
  }
 */
}
