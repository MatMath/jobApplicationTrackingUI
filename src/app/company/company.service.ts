import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CompanySchema, RecruitersInfoSchema } from '../classDefinition';
import { AppSettings } from '../config';

@Injectable()
export class CompanyService {
  private baseUrl:string = AppSettings.API_ENDPOINT;
  private cieUrl = `${this.baseUrl}/cie`;  // URL to web api
  private recruitersUrl = `${this.baseUrl}/recruiters`;

  constructor(private http: HttpClient) { }

  deleteRecruId(id:string): Promise<RecruitersInfoSchema> {
    const tmpUrl = `${this.recruitersUrl}/${id}`
    return this.http
      .delete(tmpUrl)
      .toPromise()
      .then((response) => {
        return response as any; // Dont really care as long as it is not an error.
      })
      .catch(this.handleError);
  }

  saveRecru(item: RecruitersInfoSchema): Promise<RecruitersInfoSchema> {
    if (item._id) { return this.putRecru(item); }
    return this.postRecru(item);
  }

  // Add new Recru
  private postRecru(job: RecruitersInfoSchema): Promise<RecruitersInfoSchema> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.recruitersUrl, job)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  // Update existing Recru
  private putRecru(job: RecruitersInfoSchema): Promise<RecruitersInfoSchema> {
    return this.http
      .put(this.recruitersUrl, job)
      .toPromise()
      .then(() => job)
      .catch(this.handleError);
  }

  // Company Section
  saveCie(item: CompanySchema): Promise<CompanySchema> {
    if (item._id) { return this.putCie(item); }
    return this.postCie(item);
  }

  // Add new Cie
  private postCie(job: CompanySchema): Promise<CompanySchema> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.cieUrl, job)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  // Update existing Cie
  private putCie(job: CompanySchema): Promise<CompanySchema> {
    return this.http
      .put(this.cieUrl, job)
      .toPromise()
      .then(() => job)
      .catch(this.handleError);
  }

  deleteCieId(id:string): Promise<RecruitersInfoSchema> {
    const tmpUrl = `${this.cieUrl}/${id}`
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
