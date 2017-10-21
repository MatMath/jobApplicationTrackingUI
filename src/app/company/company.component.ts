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
  emptyCie: CompanySchema = {
    _id: undefined,
    name: undefined,
    location: undefined,
    gps: {
      type: undefined,
      coordinates: [0, 0]
    },
    contact: undefined,
    link: undefined,
  };
  activeCie: CompanySchema = this.emptyCie;
  showCie:boolean = false;

  RecrutersList: RecruitersInfoSchema[];
  emptyRecruters: RecruitersInfoSchema = {
    _id: undefined,
    cie: undefined,
    name: undefined,
  };
  activeRecruters: RecruitersInfoSchema = this.emptyRecruters;
  showRecruters:boolean = false;
  showList:boolean = true;

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

  listView():void {
    this.showList = true;
    this.showCie = false;
    this.showRecruters = false;
  }

  deleteCieId(id):void {
    console.log('Delete this ID', id);
  }
  editThisCie(company:CompanySchema):void {
    this.activeCie = company;
    this.activeRecruters = this.emptyRecruters;
    this.showList = false;
    this.showCie = true;
    this.showRecruters = false;
  }

  deleteRecruId(id:string):void {
    console.log('Delete this ID', id);
  }
  editThisRecruters(item:RecruitersInfoSchema):void {
    this.activeCie = this.emptyCie;
    this.activeRecruters = item;
    this.showList = false;
    this.showCie = false;
    this.showRecruters = true;
  }

}
