import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { globalStructureSchema } from '../classDefinition';

@Injectable()
export class AnalyticService {
  private jobUrl = 'app/joblist';

  constructor(private http: Http) { }

  getJobList(): Promise<Array<globalStructureSchema>> {
    return this.http
      .get(this.jobUrl)
      .toPromise()
      .then((response) => {
        return response.json().data as globalStructureSchema[];
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
};
