import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CompanySchema, globalStructureSchema, RecruitersInfoSchema } from '../classDefinition';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  companyList: CompanySchema[] = [];
  RecrutersList: RecruitersInfoSchema[] = [];
  applicationType: string[] = ['Recruiters', 'Direct'];
  websiteList: string[] = ['Indeed', 'Linkedin', 'ZipRecruters'];
  base: globalStructureSchema = {
    location: '',
    website: '',
    applicationType: '',
    recruiters: '',
    company: '',
    title: '',
    description: '',
    date: undefined,
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
    this.dashboardService.getRecrutersList()
      .then(list => {
        this.RecrutersList = list;
      });
  }

  onSubmit() {
    // Convert data and Post it.
  }

}
