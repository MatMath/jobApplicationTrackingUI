import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { titleListForGraph, websiteWeight } from '../classDefinition';
import { AppSettings } from '../config';

@Injectable()
export class GraphService {
  private baseUrl:string = AppSettings.API_ENDPOINT;
  private jobUrl = `${this.baseUrl}/list`;

  constructor(private http: HttpClient) { }

  getTitleWeight(): Promise<Array<titleListForGraph>> {
    return this.http
      .get(`${this.baseUrl}/analytic/title`)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getWebsiteWeight(): Promise<Array<websiteWeight>> {
    return this.http
      .get(`${this.baseUrl}/analytic/website`)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
};
