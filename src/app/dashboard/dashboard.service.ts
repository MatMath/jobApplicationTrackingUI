import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { CompanySchema, RecruitersInfoSchema } from '../classDefinition';

@Injectable()
export class DashboardService {
  private cieUrl = 'app/cie';  // URL to web api
  private recruitersUrl = 'app/recruiterslist';

  constructor(private http: Http) { }

  getCompanyList(): Promise<Array<CompanySchema>> {
    return this.http
      .get(this.cieUrl)
      .toPromise()
      .then((response) => {
        return response.json().data as CompanySchema[];
      })
      .catch(this.handleError);
  }

  getRecrutersList(): Promise<Array<RecruitersInfoSchema>> {
    return this.http
      .get(this.recruitersUrl)
      .toPromise()
      .then((response) => {
        return response.json().data as RecruitersInfoSchema[];
      })
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
