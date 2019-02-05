import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

//import { ToDo } from '../models/ToDo';
import { MyTransferList } from '../models/MyTransferList';
import { JobClass } from 'src/app/models/JobClass';
import { Facility } from '../models/Facility';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private webApiUrl = 'http://10.15.56.123:8080/api';
  private transferlistUrl = 'https://localhost:5001/api/MyTransferList/ ';
 

  constructor(private http: HttpClient) { }

  getJobClasses(): Observable<JobClass[]> {
    return this.http.get<JobClass[]>(this.webApiUrl + "/lookup/maxjobcodefour")
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getMyTransferList(): Observable<MyTransferList[]> {
    return this.http.get<MyTransferList[]>(this.transferlistUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getMyTransferListByJobcode(jobcodeSearch: string): Observable<MyTransferList[]> {
    jobcodeSearch = jobcodeSearch.trim();
    const options = jobcodeSearch ? { params: new HttpParams().set('jobcode4', jobcodeSearch) } : {};
    
    return this.http.get<MyTransferList[]>(this.webApiUrl + '/TransferListEmployee/ByEmployee/' + 'faraclass' + '/' + jobcodeSearch)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  deleteTransferList(userName: string, jobCode4: string, facility_ID: number, 
                     chrtFldDeptId: string, shiftCd: string, ft_PT_Code: string ): Observable<{}> {
                    
          return this.http.delete(this.webApiUrl +  '/TransferListEmployee/' + ft_PT_Code + '/' +
              jobCode4 + '/' + facility_ID.toString().trim() + '/' + chrtFldDeptId + '/' +
              shiftCd.trim() + '/' + userName)
      .pipe(
        tap(data => console.log('DELETED: ' + JSON.stringify(data))),
        catchError(this.handleError)
      ); 
  }

  deleteAllTransferLists(userName: string, jobCode4: string, lastModifiedUser: string): Observable<{}> {
   
          return this.http.delete(this.webApiUrl +  '/TransferListEmployee/' + userName + '/' +
                jobCode4 + '/' + lastModifiedUser)
    .pipe(
      tap(data => console.log('DELETED: ' + JSON.stringify(data))),
      catchError(this.handleError)
    ); 
}

  getTransferFacilityByJobcode(jobcodeSearch: string): Observable<Facility[]> {
  jobcodeSearch = jobcodeSearch.trim();
  const options = jobcodeSearch ? { params: new HttpParams().set('jobcode4', jobcodeSearch) } : {};
  
  return this.http.get<Facility[]>(this.webApiUrl + '/Lookup/TransferListFacility/' + jobcodeSearch)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
}


  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
