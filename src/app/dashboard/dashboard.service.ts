import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { CompanySchema, RecruitersInfoSchema, globalStructureSchema } from '../classDefinition';

@Injectable()
export class DashboardService {
  private baseUrl:string = 'http://localhost:3001';
  private cieUrl = `${this.baseUrl}/cie`;  // URL to web api
  private recruitersUrl = `${this.baseUrl}/recruiters`;
  private jobUrl = `${this.baseUrl}/list`;

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

  getJobId(id:string): Promise<globalStructureSchema> {
    return this.http
      .get(`${this.jobUrl}/${id}`)
      .toPromise()
      .then((response) => {
        console.log('RESPONSE:', response);
        return response;
      })
      .catch(this.handleError);
  }

  saveJob(job: globalStructureSchema): Promise<globalStructureSchema> {
    if (job._id) {
      return this.putJob(job);
    }
    return this.postJob(job);
  }

  // Add new Hero
  private postJob(job: globalStructureSchema): Promise<globalStructureSchema> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.jobUrl, job)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  // Update existing Job
  private putJob(job: globalStructureSchema): Promise<globalStructureSchema> {
    return this.http
      .put(this.jobUrl, job)
      .toPromise()
      .then(() => job)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
