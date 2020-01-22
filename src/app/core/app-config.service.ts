import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 


@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  public version: string;
  public envName: string;
  public webApiUrl: string;

  constructor(private http: HttpClient) {}

  // The URL for the web service is pulled from app.config.json, in assets/config.
  // The configuration settings for Dev, Test, and Prod exist in the assets/config/Development, Production, and Test folders.
  // In each of these folders, there is an app.config.json file. To switch between the environments, either copy the
  // appropriate app.config.json file from the folder or copy/paste contents to assets/config/app.config.json.
  // ===========================================================================================================================

  load() :Promise<any>  {

      const promise = this.http.get('./assets/config/app.config.json')
        .toPromise()
        .then(data => {
          Object.assign(this, data);
          return data;
        });

      return promise;
  }
}