import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CompanySchema, RecruitersInfoSchema } from '../classDefinition';
import { AppSettings } from '../config';

@Injectable()
export class GenericService {
  private baseUrl:string = AppSettings.API_ENDPOINT;
  private cieUrl = `${this.baseUrl}/cie`;  // URL to web api
  private recruitersUrl = `${this.baseUrl}/recruiters`;

  constructor( private http: HttpClient ) { }

  getCompanyList(): Promise<Array<CompanySchema>> {
    return this.http
      .get(this.cieUrl)
      .toPromise()
      .then((response) => {
        return response as CompanySchema[];
      })
      .catch(this.handleError);
  }

  getRecrutersList(): Promise<Array<RecruitersInfoSchema>> {
    return this.http
      .get(this.recruitersUrl)
      .toPromise()
      .then((response) => {
        return response as RecruitersInfoSchema[];
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
