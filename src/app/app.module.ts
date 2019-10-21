import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxMaskModule} from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout'; 
import { ReactiveFormsModule } from '@angular/forms';    

import { MyTransferlistComponent } from './components/my-transferlist/my-transferlist.component';
import { FilteredTransferlistComponent } from './components/filtered-transferlist/filtered-transferlist.component';
import { ReportsComponent } from './components/reports/reports.component';
import { VacanciesComponent } from './components/vacancies/vacancies.component';
import { EmployeeProfileDialogComponent } from './components/admin/employee-profile-dialog/employee-profile-dialog.component';
import { DeleteAllDialogComponent } from './components/my-transferlist/dialogs/delete-all-dialog.component';
import { DeleteOneDialogComponent } from './components/my-transferlist/dialogs/delete-one-dialog.component';
import { CreateTransferlistDialogComponent } from './components/my-transferlist/dialogs/create-transferlist-dialog.component';
import { ReportViewerDialogComponent } from './components/report-viewer-dialog/report-viewer-dialog.component';
import { EmployeeSeniorityDialogComponent } from './components/admin/employee-seniority-dialog/employee-seniority-dialog.component';
import { NoCacheHeadersInterceptor } from './core/http-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    MyTransferlistComponent,
    FilteredTransferlistComponent,
    ReportsComponent,
    VacanciesComponent,
    EmployeeProfileDialogComponent,
    DeleteAllDialogComponent,
    DeleteOneDialogComponent,
    CreateTransferlistDialogComponent,
    ReportViewerDialogComponent,
    EmployeeSeniorityDialogComponent
  ],
  entryComponents: [
    EmployeeProfileDialogComponent,
    DeleteAllDialogComponent,
    DeleteOneDialogComponent,
    CreateTransferlistDialogComponent,
    ReportViewerDialogComponent,
    EmployeeSeniorityDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({})
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NoCacheHeadersInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
