import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CompanySchema, globalStructureSchema } from '../classDefinition';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  companyList: CompanySchema[] = [];
  applicationType: string[] = ['Recruiters', 'Direct'];
  base: globalStructureSchema = {
    location: '',
    website: '',
    applicationType: '',
    recruiters: '',
    company: '',
    title: '',
    description: '',
    date: 0,
    application: false,
    answer_receive: false,
    meeting: [],
    notes: '',
    cover_letter: '',
  };
  submitted: boolean = false;

  constructor(
    private router: Router,
    private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.getCompanyList()
      .then(companyList => {
        this.companyList = companyList;
      });
  }

  onSubmit() { this.submitted = true; }

}
