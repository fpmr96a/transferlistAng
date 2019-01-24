import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyTransferlistComponent } from './components/my-transferlist/my-transferlist.component';
import { FilteredTransferlistComponent } from './components/filtered-transferlist/filtered-transferlist.component';
import { ReportsComponent } from './components/reports/reports.component';
import { VacanciesComponent } from './components/vacancies/vacancies.component';


const routes: Routes = [
  { path: 'mytransferlist', component: MyTransferlistComponent },
  { path: 'filteredtransferlist', component: FilteredTransferlistComponent },
  { path: 'vacancy', component: VacanciesComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '', redirectTo: 'mytransferlist', pathMatch: 'full'},
  { path: '**', redirectTo: 'mytransferlist', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
