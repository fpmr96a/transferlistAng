import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyTransferlistComponent } from './components/my-transferlist/my-transferlist.component';
import { FilteredTransferlistComponent } from './components/filtered-transferlist/filtered-transferlist.component';
import { EmployeeProfileComponent } from './components/admin/employee-profile.component';
import { ReportsComponent } from './components/reports/reports.component';
import { VacanciesComponent } from './components/vacancies/vacancies.component';

@NgModule({
  declarations: [
    AppComponent,
    MyTransferlistComponent,
    FilteredTransferlistComponent,
    EmployeeProfileComponent,
    ReportsComponent,
    VacanciesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
