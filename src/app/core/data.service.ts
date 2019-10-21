import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

//import { ToDo } from '../models/ToDo';
import { MyTransferList } from '../models/MyTransferList';
import { JobClass } from 'src/app/models/JobClass';
import { Facility } from '../models/Facility';
import { FunctionalUnit } from '../models/FunctionalUnit';
import { Shift } from '../models/shift';
import { EmployeeProfile } from '../models/EmployeeProfile';
import { FilteredTransferList } from '../models/FilteredTransferList';
import { Vacancy } from '../models/Vacancy';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private webApiUrl = 'http://10.15.56.123:8080/api';
  private transferlistUrl = 'https://localhost:5001/api/MyTransferList/ ';
  private localWebApiUrl = 'https://localhost:44345/api';
 

  constructor(private http: HttpClient) { }


  // ****************************************************************************************************
  // ** All XmlHttpRequest calls not working when using EDGE browser. This is due to 10.15.56.123      **
  // ** being blocked and Developer Tools / Network indicates results pulled from cache, but that is   **
  // ** deceiving. I added an HttpInterceptor that injects http headers into each XmlHttpRequest       **
  // ** that attempts to turn off caching, but that didn't remedy the problem.                         **
  // ** The hokey workaround is to have Fiddler running when running from EDGE. Supposedly, when       **
  // ** Fiddler is running, the proxy settings are pointed at Fiddler itself and EDGE is able to       **
  // ** access the web api server. It is stated that EDGE runs in Enhanced Protected Mode (AppCenter). **
  // ** That has a feature which blocks access to Private Network Resources from Internet-Zone         **
  // ** processes.                                                                                     **
  // ** The workaround/solution is to add the server to the Local Intranet zone in Internet Options.   **
  // ** Another recommendation was to add the server to TRUSTED WEBSITES .                             **
  // ****************************************************************************************************

  // Service Calls for MyTransferList page
  // =====================================

  // This method should be replaced with one that passes userName and returns Transfer List Job Codes
  // that the user is authorized to access, as opposed to all transfer list job codes
  // ================================================================================================
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


  // DELETE Transfer Lists for employee jobcode, facility, functional unit, shift and FT/PT
  // =======================================================================================
  deleteTransferList(userName: string, jobCode4: string, facility_ID: number, 
                     chrtFldDeptId: string, shiftCd: string, ft_PT_Code: string ): Observable<{}> {
                    
    return this.http.delete(this.webApiUrl +  '/TransferListEmployee/' + 
        ft_PT_Code + '/' +
        jobCode4 + '/' + 
        facility_ID.toString().trim() + '/' + 
        chrtFldDeptId + '/' +
        shiftCd.trim() + '/' + 
        userName)
      .pipe(
        tap(data => console.log('DELETED: ' + JSON.stringify(data))),
        catchError(this.handleError)
      ); 
  }

  // DELETE ALL Transfer Lists for an Employee Job Code
  // ==================================================
  deleteAllTransferLists(userName: string, jobCode4: string, lastModifiedUser: string): Observable<{}> {
   
    return this.http.delete(this.webApiUrl +  '/TransferListEmployee/' + 
        userName + '/' +
        jobCode4 + '/' + 
        lastModifiedUser)
      .pipe(
        tap(data => console.log('DELETED: ' + JSON.stringify(data))),
        catchError(this.handleError)
    ); 
}

// The following Service Calls are for the CREATE TRANSFER LIST dialog
// ===================================================================
  getTransferFacilityByJobcode(jobcodeSearch: string): Observable<Facility[]> {
  jobcodeSearch = jobcodeSearch.trim();
  const options = jobcodeSearch ? { params: new HttpParams().set('jobcode4', jobcodeSearch) } : {};
  
  return this.http.get<Facility[]>(this.webApiUrl + '/Lookup/TransferListFacility/' + jobcodeSearch)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
}

getFunctionalUnitByFacilityByJobcode(facilityCD: string, jobcodeSearch: string): Observable<FunctionalUnit[]> {
  console.log('getFunctionalUnitByFacility facilityCD = ' + facilityCD);
 
  console.log(this.webApiUrl + '/Lookup/FunctionalUnit/' + jobcodeSearch + '/' + facilityCD);
  return this.http.get<FunctionalUnit[]>(this.webApiUrl + '/Lookup/FunctionalUnit/' + jobcodeSearch + '/' + facilityCD)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
}

getShiftByJobcode(jobcodeSearch: string): Observable<Shift[]> {
  jobcodeSearch = jobcodeSearch.trim();
  console.log(this.webApiUrl + '/Lookup/TransferListShift/' + jobcodeSearch);
  return this.http.get<Shift[]>(this.webApiUrl + '/Lookup/TransferListShift/' + jobcodeSearch)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
}

// The following calls deal with the Employee Profile
// ===================================================
getEmployeeProfile(userName: string): Observable<EmployeeProfile> {
  userName = userName.trim();
  console.log(this.webApiUrl + '/Employee/profile/' + userName);
  return this.http.get<EmployeeProfile>(this.webApiUrl + '/Employee/profile/' + userName)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
}

// The following calls deal with the Update (Put) Employee Profile
// NOTE: This should be changed to send updated data to service
//        via the JSON object only and not send individual parms.
// ================================================================
updateEmployeeProfile(userName: string, empProfile: EmployeeProfile): Observable<EmployeeProfile> {
  userName = userName.trim();
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); 
  console.log('PUT:' + this.webApiUrl + '/employee/profile/' + userName + '/'
  + empProfile.daytimePhoneNumber + '/' + empProfile.bilingual + '/' + empProfile.languagesSpoken);
  
  return this.http.put<EmployeeProfile>(this.webApiUrl + '/Employee/profile/' + 
          userName + '/' + 
          empProfile.daytimePhoneNumber + '/' + 
          empProfile.bilingual + '/' + 
          empProfile.languagesSpoken,
          empProfile,
          { headers: headers })
    .pipe(
      tap(data => console.log('returned from PUT: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
}

createTransferListEmployee(jobCode4: string, facility_ID: string, 
  chrtFldDeptId: string, shiftCd: string, ft_PT_Code: string, userName: string, lastModID: string): Observable<MyTransferList> {
  
    console.log('POST:' + this.webApiUrl + '/TransferListEmployee/' +
    ft_PT_Code    + '/' +
    jobCode4      + '/' +
    facility_ID   + '/' +
    chrtFldDeptId + '/' +
    shiftCd.trim()       + '/' +
    userName      + '/' +
    lastModID);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); 

    return this.http.post<MyTransferList>(this.webApiUrl + '/TransferListEmployee/' +
              ft_PT_Code    + '/' +
              jobCode4      + '/' +
              facility_ID   + '/' +
              chrtFldDeptId + '/' +
              shiftCd.trim()       + '/' +
              userName      + '/' +
              lastModID,
              { headers: headers })
    .pipe(
      tap(data => console.log('Post data returned: ' + JSON.stringify(data))),
      catchError(this.handleError)
  );

   
}


// The following Calls are for the Filtered Transfer List screen.
// Sending parameters via the HttpParams object, which ultimately
// turns the parameters into regular querystring variables.
// ===============================================================
getFilteredTransferList(jobCode4: string, facility_ID: string, 
  chrtFldDeptId: string, shiftCd: string, ft_PT_Code: string): Observable<FilteredTransferList[]> {
  const params =  new HttpParams()
    .set('FtPtCode', ft_PT_Code)
    .set('JobCode4', jobCode4)   
    .set('FacilityId', facility_ID)
    .set('ChrtFldDeptId', chrtFldDeptId)
    .set('ShiftCd', shiftCd.trim());

    return this.http.get<FilteredTransferList[]>(this.webApiUrl + '/transferlist/filter', {params})
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

  // Service Calls for the Vacancy screen
  // =====================================
  getClosedVacancies(daysSinceFilled: string, jobCode4: string): Observable<Vacancy[]> {
    const params =  new HttpParams()
      .set('DaysSinceFilled', daysSinceFilled)
      .set('JobCode4', jobCode4);
  
      return this.http.get<Vacancy[]>(this.webApiUrl + '/transferlist/ClosedVacancy', {params})
        .pipe(
          tap(data => console.log('closed vacancies: ' + JSON.stringify(data))),
          catchError(this.handleError)
      );
  }

  getOpenVacancies(jobCode4: string): Observable<Vacancy[]> {
    const params =  new HttpParams()
      .set('JobCode4', jobCode4);
  
      return this.http.get<Vacancy[]>(this.webApiUrl + '/transferlist/OpenVacancy', {params})
        .pipe(
          tap(data => console.log('open vacancies: ' + JSON.stringify(data))),
          catchError(this.handleError)
      );
  }

  getClearedOpenVacancies(jobCode4: string): Observable<Vacancy[]> {
    const params =  new HttpParams()
      .set('JobCode4', jobCode4);
  
      return this.http.get<Vacancy[]>(this.webApiUrl + '/transferlist/ClearedOpenVacancy', {params})
        .pipe(
          tap(data => console.log('cleared open vacancies: ' + JSON.stringify(data))),
          catchError(this.handleError)
      );
  }
}
