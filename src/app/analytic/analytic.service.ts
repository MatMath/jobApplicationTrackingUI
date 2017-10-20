import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { globalStructureSchema } from '../classDefinition';

@Injectable()
export class AnalyticService {
  private baseUrl:string = 'http://localhost:3001';
  private jobUrl = `${this.baseUrl}/list`;

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

  deleteListId(id:string): Promise<Array<globalStructureSchema>> {
    const tmpUrl = `${this.jobUrl}/${id}`
    return this.http
      .delete(tmpUrl)
      .toPromise()
      .then((response) => {
        return response as any; // Dont really care as long as it is not an error.
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
};
