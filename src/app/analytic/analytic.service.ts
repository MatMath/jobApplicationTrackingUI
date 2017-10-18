import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { globalStructureSchema } from '../classDefinition';

@Injectable()
export class AnalyticService {
  private baseUrl:string = 'http://localhost:3001';
  private jobUrl = `${this.baseUrl}/list`;
  // private headers = new Headers({
  //   'Content-Type': 'application/json',
  // });

  constructor(private http: HttpClient) { }

  getJobList(): Promise<Array<globalStructureSchema>> {
    return this.http
      .get(this.jobUrl)
      .toPromise()
      .then((response) => {
        return response as globalStructureSchema[];
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
};
