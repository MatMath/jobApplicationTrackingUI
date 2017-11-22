import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { globalStructureSchema, userParamStructure } from '../classDefinition';
import { AppSettings } from '../config';

@Injectable()
export class DashboardService {
  private baseUrl:string = AppSettings.API_ENDPOINT;
  private jobUrl = `${this.baseUrl}/list`;

  constructor( private http: HttpClient ) { }

  getJobId(id:string): Promise<globalStructureSchema> {
    return this.http
      .get(`${this.jobUrl}/${id}`)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch(this.handleError);
  }

  getParam(): Promise<userParamStructure> {
    return this.http
      .get(`${this.baseUrl}/param`)
      .toPromise()
      .then((response) => {
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

  // Add new Job
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
