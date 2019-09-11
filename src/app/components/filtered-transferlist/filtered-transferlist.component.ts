import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { DataService } from '../../core/data.service';

import { JobClass } from 'src/app/models/JobClass';
import { Facility } from 'src/app/models/Facility';
import { FunctionalUnit } from 'src/app/models/FunctionalUnit';
import { Shift } from 'src/app/models/shift';
import { FTPT } from 'src/app/models/ftpt';
import { FilteredTransferList } from 'src/app/models/FilteredTransferList';
import { ReportViewerDialogComponent } from '../report-viewer-dialog/report-viewer-dialog.component';



@Component({
  selector: 'app-filtered-transferlist',
  templateUrl: './filtered-transferlist.component.html',
  styleUrls: ['./filtered-transferlist.component.scss']
})
export class FilteredTransferlistComponent implements OnInit {
  jobClassFormControl = new FormControl('', Validators.required);
  facilityFormControl = new FormControl('', Validators.required);
  functionalUnitFormControl = new FormControl('', Validators.required);
  shiftFormControl = new FormControl('', Validators.required);
  ftptFormControl = new FormControl('');

  jobClasses: JobClass[] = [];
  selectedJobClass: JobClass;
  selectedJobClassDescription: string = 'Select Job Class';
  selectedJobClassCode: string;

  facilities: Facility[] = [];
  selectedFacility: Facility;
  selectedFacilityCode: string;
  selectedFacilityDescription: string = 'Select Facility';
  
  functionalUnits: FunctionalUnit[] = [];
  selectedFunctionalUnit: FunctionalUnit;
  selectedFunctionalUnitDescription: string = 'Select Functional Unit';
  selectedFunctionalUnitCode: string;

  shifts: Shift[] = [];
  selelectedShift: Shift;
  selectedShiftCode: string;
  selectedShiftDescription: string = 'Select Shift';

  ftpts: FTPT[] = [];
  selectedFTPT: FTPT;
  selectedFTPTCode: string;
  selectedFTPTDescription: string = 'Select FT/PT';

  filteredTransferLists: FilteredTransferList[] = [];
  emptyFilteredTransferLists: FilteredTransferList[] = [];

  displayedColumns: string[] = ['full_Name', 'addedToList_DateTime', 'current_facility', 'current_func_unit', 'fT_PT'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoading = true;
  errorMessage = '';
  constructor(public dataService: DataService,
              public dialog: MatDialog) { }

  ngOnInit() {
    // Populate Job Classes Dropdown
    // =============================
    this.dataService.getJobClasses().subscribe(
      jobclasses => {
        this.jobClasses = jobclasses;
        this.isLoading=false;
        console.log("Filtered Job classes Returned" + JSON.stringify(this.jobClasses));
      },
      error => this.errorMessage = <any>error
    ); 

    // Populate FT/PT dropdown
    // =======================
    this.getFTPT();
  
    // When an item in Job Class Dropdown selected, grab job class JSON string, load
    // JSON object, and populate code and description properties. Also populate the
    // Facility and Shift dropdowns, for job class selected and clear out the
    // Facility, functional unit and shift selections, if present.
    // ==============================================================================
    this.jobClassFormControl.valueChanges.subscribe(
      value => {
        this.selectedJobClass = JSON.parse(value);
        this.selectedJobClassDescription = this.selectedJobClass.description;
        this.selectedJobClassCode = this.selectedJobClass.code.toString();

        this.resetFacility();
        this.resetFunctionalUnit();
        this.resetShift(true);

        this.getFacilityAndShiftByJobclass(this.selectedJobClassCode);
        
        // Clear Grid
        // ===========
        this.dataSource.data = this.emptyFilteredTransferLists;
        //this.isLoading=true;
      }
    );

    // When faclity changes, get functional units and reset selected functional unit
    // and shift, if selected.
    // =============================================================================
    this.facilityFormControl.valueChanges.subscribe(
      value => {
        this.selectedFacility = JSON.parse(value);
        this.selectedFacilityDescription = this.selectedFacility.description;
        this.selectedFacilityCode = this.selectedFacility.code.toString();
       
        this.getFunctionalUnits(this.selectedFacilityCode, this.selectedJobClassCode);
        this.resetFunctionalUnit();
        this.resetShift(false);
        
        // Clear Grid
        // ===========
        this.dataSource.data = this.emptyFilteredTransferLists;
       
      }
    );

    // When functional unit changes, reset shift
    // =========================================
    this.functionalUnitFormControl.valueChanges.subscribe(
      value => {
        this.selectedFunctionalUnit = JSON.parse(value);
        this.selectedFunctionalUnitDescription = this.selectedFunctionalUnit.description;
        this.selectedFunctionalUnitCode = this.selectedFunctionalUnit.chrtFld_Dept_ID.toString();
       
        console.log('FUNCTIONAL UNIT VALUE CHANGED EVENT FIRED!');

        this.getFilteredTransferList();
        //this.resetShift();
        //this.isLoading=true;
      }
    );

    this.shiftFormControl.valueChanges.subscribe(
      value => {
        this.selelectedShift = JSON.parse(value);
        this.selectedShiftDescription = this.selelectedShift.description;
        this.selectedShiftCode = this.selelectedShift.code.toString();
       
        this.getFilteredTransferList();
        //this.isLoading=true;
      }
    );

    this.ftptFormControl.valueChanges.subscribe(
      value => {
        this.selectedFTPT = JSON.parse(value);
        this.selectedFTPTCode = this.selectedFTPT.code;
        this.selectedFTPTDescription = this.selectedFTPT.description;
        console.log("Selected FT PT: " + this.selectedFTPTDescription);
       // console.log("Selected property:" + this.ftptFormControl.)
       this.getFilteredTransferList();
      }
    )
  }

  getFacilityAndShiftByJobclass(selectedJobClass: string): void {
    this.dataService.getTransferFacilityByJobcode(selectedJobClass).subscribe(
      returnedFacilities => {
        this.facilities = returnedFacilities;
        console.log("facilities Returned" + JSON.stringify(this.facilities));
      },
      error => this.errorMessage = <any>error
    ); 

    this.dataService.getShiftByJobcode(selectedJobClass).subscribe(
      returnedShifts => {
        this.shifts = returnedShifts;
        console.log("shifts Returned" + JSON.stringify(this.shifts));
      },
      error => this.errorMessage = <any>error
    ); 
  }

  getFunctionalUnits(facility: string, jobcode: string) {
    this.dataService.getFunctionalUnitByFacilityByJobcode(facility, jobcode).subscribe(
      returnedFuntionalUnits => {
         this.functionalUnits = returnedFuntionalUnits;
        
      

        console.log("Functional Units Returned" + JSON.stringify(this.functionalUnits));
      }, 
      error => this.errorMessage = <any>error
      
    );
  }

  getFTPT() {
    const ftpt: FTPT[] = [
      {
        'code': '0',
        'description': 'Both'
      },
      {
        'code': 'F',
        'description': 'Full-Time'
      },
      {
        'code': 'P',
        'description': 'Part-Time'
      }
    ];
    this.ftpts = ftpt;  
  }

  getFilteredTransferList() {
    /* if (this.selectedJobClassCode.trim() === '' ||
        this.selectedFacilityCode.trim() === '' ||
        this.selectedFunctionalUnitCode.trim() === '' ||
        this.selectedShiftCode.trim() === '' ||
        this.selectedFTPTCode.trim() === '')
    {
      
      console.log('Exiting getFilteredTransferList due to 1 more parms empty');
      return;
    } */
    
    this.dataService.getFilteredTransferList(
          this.selectedJobClassCode,
          this.selectedFacilityCode,
          this.selectedFunctionalUnitCode,
          this.selectedShiftCode,    
          this.selectedFTPTCode,
          )
    .subscribe(
      returnedTransferLists => {
        console.log("Filtered Transfer List Returned: " + JSON.stringify(returnedTransferLists));
        this.dataSource.data = returnedTransferLists;
        this.dataSource.sort = this.sort;
        //this.isLoading=false;
      }, 
      error => this.errorMessage = <any>error
      
    );
  }

  stringifyJobClassObject(selectedJobClass: any): string {
    return JSON.stringify(selectedJobClass);
   }
  
   stringifySelectObject(selectedItem: any): string {
    return JSON.stringify(selectedItem);
   }

   resetFacility(): void {
    this.selectedFacility = null;
    this.selectedFacilityCode = '';
    this.selectedFacilityDescription = 'Select Facility';

    this.facilities = [];
   }

   resetFunctionalUnit(): void {
    this.selectedFunctionalUnit = null;
    this.selectedFunctionalUnitDescription = 'Select Functional Unit';
    this.selectedFunctionalUnitCode = '';

    this.functionalUnits = [];
    // *** NOTE: There is an unresolved for each of the SELECT controls, as follows:
    // ***       If values are selected for all SELECTS, then the user changes the JOB CLASS,
    // **        which triggers all the other SELECTS to be wiped out, it seems like the prior
    // **        selected item is not forgotten. That is, if the first item in Functional Unit WAS
    // **        selected beforehand, and then reloaded after new job class selected, but then if
    // **        the same prior items are selected, the first item in function unit is pre-selected
    // **        and therefore if user tries to RE-SELECT the value changes event not fired and user
    // **        can't reselect.  Tried RESETing the control but not working.
    
    //this.functionalUnitFormControl.reset();
 
   }

   resetShift(clearLoadedShifts: boolean): void {
    this.selelectedShift = null;
    this.selectedShiftCode = '';
    this.selectedShiftDescription = 'Select Shift';

    if (clearLoadedShifts)
    {
      this.shifts = [];
    }
    
   }

   viewSampleReport(userName: string, jobCode4: string){
    
    let dialogRef = this.dialog.open(ReportViewerDialogComponent, {
    width: '75%',
    height: '93%',
    disableClose: true,
    data: {rptID: 'rpt01', jobCode4: '5724'}
  });
   
  }

  shiftClicked() {
    // If Shift clicked, refresh grid.
    // =============================== 
    this.getFilteredTransferList();
  }
}
