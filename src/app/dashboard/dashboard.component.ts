import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CompanySchema } from '../classDefinition';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  companyList: CompanySchema[] = [];
  applicationType: string[] = ['Recruiters', 'Direct'];

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

}
