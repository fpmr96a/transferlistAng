import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

declare var Stimulsoft: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class ReportsComponent implements OnInit {

  options: any = new Stimulsoft.Viewer.StiViewerOptions();
	viewer: any = new Stimulsoft.Viewer.StiViewer(this.options, 'StiViewer', false);

	ngOnInit() {
		var report = new Stimulsoft.Report.StiReport();
		report.loadFile("app/reports/MyTransferList.mrt");

		 
		
		//var str = Stimulsoft.System.IO.File.getFile("reports/MyTransferList.mrt");
		//var report = new Stimulsoft.Report.StiReport();
		//report.load(str);

		report.dictionary.databases.clear();

		var dsMyTransferList = new Stimulsoft.System.Data.DataSet();
		//dsMyTransferList.readJsonFile("data/MyTransferList.json");
		dsMyTransferList.readJson('[{"facility_ID":2,"chrtFldDeptId":"MHA53750","shiftCd":"2 ","facilityShortDescription":"CVH","functionalUnitDescription":"ASD-M4B-Merritt 4B-Detox Program","shiftDescription":"2nd shift","addedToListDateTime":"2019-02-07 08:18:54","ft_PT_Code":"F","ft_PT_Description":"Full-Time","userName":"faraclass","jobCode4":"5724"},{"facility_ID":2,"chrtFldDeptId":"MHA53761","shiftCd":"2 ","facilityShortDescription":"CVH","functionalUnitDescription":"ASD-M2AB-Merritt 2 AB - Male Rehab","shiftDescription":"2nd shift","addedToListDateTime":"2019-02-12 10:59:25","ft_PT_Code":"F","ft_PT_Description":"Full-Time","userName":"faraclass","jobCode4":"5724"},{"facility_ID":5,"chrtFldDeptId":"MHA54211","shiftCd":"1 ","facilityShortDescription":"RVS","functionalUnitDescription":"Managed Service System","shiftDescription":"1st shift","addedToListDateTime":"2019-02-18 12:57:18","ft_PT_Code":"F","ft_PT_Description":"Full-Time","userName":"faraclass","jobCode4":"5724"},{"facility_ID":5,"chrtFldDeptId":"MHA54242","shiftCd":"1 ","facilityShortDescription":"RVS","functionalUnitDescription":"Mobile Crisis Team","shiftDescription":"1st shift","addedToListDateTime":"2019-02-18 12:57:18","ft_PT_Code":"F","ft_PT_Description":"Full-Time","userName":"faraclass","jobCode4":"5724"},{"facility_ID":5,"chrtFldDeptId":"MHA54266","shiftCd":"1 ","facilityShortDescription":"RVS","functionalUnitDescription":"Community Support Program Team B","shiftDescription":"1st shift","addedToListDateTime":"2019-02-18 12:57:18","ft_PT_Code":"F","ft_PT_Description":"Full-Time","userName":"faraclass","jobCode4":"5724"},{"facility_ID":5,"chrtFldDeptId":"MHA54341","shiftCd":"1 ","facilityShortDescription":"RVS","functionalUnitDescription":"Young Adult Services","shiftDescription":"1st shift","addedToListDateTime":"2019-02-18 12:57:18","ft_PT_Code":"F","ft_PT_Description":"Full-Time","userName":"faraclass","jobCode4":"5724"},{"facility_ID":5,"chrtFldDeptId":"MHA54342","shiftCd":"1 ","facilityShortDescription":"RVS","functionalUnitDescription":"Community Living Services","shiftDescription":"1st shift","addedToListDateTime":"2019-02-18 12:57:18","ft_PT_Code":"F","ft_PT_Description":"Full-Time","userName":"faraclass","jobCode4":"5724"}]')
	
		report.regData("MyTransferList", null, dsMyTransferList);

		this.viewer.report = report;
		this.viewer.renderHtml("viewerContent");;
	}

	constructor(private http: HttpClientModule) {

	}
}
