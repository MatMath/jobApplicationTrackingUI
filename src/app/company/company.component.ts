import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Types
import { CompanySchema, RecruitersInfoSchema } from '../classDefinition';

import { GenericService } from '../generic/generic.service';

@Component({
  selector: 'my-company',
  templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {
  companyList: CompanySchema[];
  RecrutersList: RecruitersInfoSchema[];

  constructor(
    private genericService: GenericService
  ) {}

  ngOnInit():void {
    this.genericService.getCompanyList()
      .then(companyList => {
        this.companyList = companyList;
      });
    this.genericService.getRecrutersList()
      .then(list => {
        this.RecrutersList = list;
      });

  }
}
