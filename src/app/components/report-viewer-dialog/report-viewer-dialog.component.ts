import { Component, OnInit, Inject } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DataService } from '../../core/data.service';
import { MyTransferList } from '../../models/MyTransferList';
import { HttpClientModule } from '@angular/common/http';

declare var Stimulsoft: any;

@Component({
  selector: 'app-report-viewer-dialog',
  templateUrl: './report-viewer-dialog.component.html',
  styleUrls: ['./report-viewer-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportViewerDialogComponent implements OnInit {

  options: any = new Stimulsoft.Viewer.StiViewerOptions();
  viewer: any = new Stimulsoft.Viewer.StiViewer(this.options, 'StiViewer', false);

   

constructor(private dialogRef: MatDialogRef<ReportViewerDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { } 


  ngOnInit() {
    this.GetMyTransferListByJobCode("5724");
  }

  GetMyTransferListByJobCode(jobcode: string) {
		this.dataService.getMyTransferListByJobcode(jobcode).subscribe(
		  mytransferlists => {
			
			var report = new Stimulsoft.Report.StiReport();
      //report.loadFile("app/reports/MyTransferList.mrt");
      //report.loadFile("app/reports/JobCodeReport.mrt");

      var rptID = 'rpt02';
      
      switch  (rptID) {
        case 'rpt01': {
          report.loadFile("app/reports/MyTransferList.mrt");
          break;
        }
        case 'rpt02': {
          report.loadFile("app/reports/JobCodeReport.mrt");
          break;
        }
      }
			report.dictionary.databases.clear();
			var dsMyTransferList = new Stimulsoft.System.Data.DataSet();

			dsMyTransferList.readJson(JSON.stringify(mytransferlists));

			report.regData("MyTransferList", null, dsMyTransferList);
			

			this.viewer.report = report;
			this.viewer.renderHtml("viewerContent");
		  },
		  //error => this.errorMessage = <any>error
		);
    }
    
    closeWindow(): void {
      this.dialogRef.close();
    }

}
