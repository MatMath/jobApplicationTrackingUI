import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { CompanySchema, RecruitersInfoSchema, globalStructureSchema } from '../classDefinition';

@Injectable()
export class DashboardService {
  private cieUrl = 'app/cie';  // URL to web api
  private recruitersUrl = 'app/recruiterslist';
  private jobUrl = 'app/joblist';

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

  saveJob(job: globalStructureSchema): Promise<globalStructureSchema> {
    if (job.id) {
      return this.putJob(job);
    }
    return this.postJob(job);
  }

  // Add new Hero
  private postJob(job: globalStructureSchema): Promise<globalStructureSchema> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.jobUrl, JSON.stringify(job), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update existing Job
  private putJob(job: globalStructureSchema): Promise<globalStructureSchema> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.jobUrl}/${job.id}`;

    return this.http
      .put(url, JSON.stringify(job), { headers: headers })
      .toPromise()
      .then(() => job)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
