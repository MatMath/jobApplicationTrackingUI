import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Types
import { CompanySchema, RecruitersInfoSchema } from '../classDefinition';

import { GenericService } from '../generic/generic.service';
import { CompanyService } from './company.service';

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
  activeRecruters: RecruitersInfoSchema = {...this.emptyRecruters};
  showRecruters:boolean = false;
  showList:boolean = true;

  constructor(
    private genericService: GenericService,
    private companyService: CompanyService
  ) {}
  private removeIdFromList = (list:RecruitersInfoSchema[], id:string):RecruitersInfoSchema[] => list.filter(item => (item._id !== id))

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

  newCie(cie:boolean) {
    this.showList = false;
    this.showCie = cie;
    this.showRecruters = !cie;
    this.activeCie = this.emptyCie;
    this.activeRecruters = {...this.emptyRecruters};
  }
  deleteCieId(id):void {
    console.log('Delete this ID', id);
  }
  editThisCie(company:CompanySchema):void {
    this.activeCie = company;
    this.activeRecruters = {...this.emptyRecruters};
    this.showList = false;
    this.showCie = true;
    this.showRecruters = false;
  }

  deleteRecruId(id:string):void {
    console.log('Delete this ID', id);
    this.companyService.deleteRecruId(id)
      .then(data => {
        this.RecrutersList = this.removeIdFromList(this.RecrutersList, id);
        this.activeRecruters = {...this.emptyRecruters};
      })
  }
  editThisRecruters(item:RecruitersInfoSchema):void {
    this.activeCie = this.emptyCie;
    this.activeRecruters = item;
    this.showList = false;
    this.showCie = false;
    this.showRecruters = true;
  }
  submitRecru():void {
    this.companyService.saveRecru(this.activeRecruters)
      .then(data => {
        if (!this.activeRecruters._id) {
          this.RecrutersList.push(this.activeRecruters);
        }
        this.activeRecruters = {...this.emptyRecruters};
        this.listView();
      })
  }

}
