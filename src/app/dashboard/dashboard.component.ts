import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { CompanySchema, globalStructureSchema, RecruitersInfoSchema, MeetingInfoSchema } from '../classDefinition';
import { DashboardService } from './dashboard.service';
import { GenericService } from '../generic/generic.service';
import { CompanyService } from '../company/company.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  companyList: CompanySchema[] = [];
  RecrutersList: RecruitersInfoSchema[] = [];
  websiteList: string[] = ['', 'Indeed', 'Linkedin', 'ZipRecruters'];
  typeOfPosition: string[] = ['Front End Eng', 'NodeJs Eng', 'Senior Front-end', 'Senior Backend', 'Fullstack', 'Senior Fullstack'];
  emptyObject: globalStructureSchema = {
    _id: undefined,
    location: undefined,
    website: undefined,
    applicationType: undefined,
    recruiters: undefined,
    company: undefined,
    title: undefined,
    description: undefined,
    date: new Date(),
    application: false,
    answer_receive: false,
    meeting: [],
    notes: undefined,
    cover_letter: undefined,
  };
  base: globalStructureSchema = {...this.emptyObject};
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
  meetingInfo: MeetingInfoSchema = {
    date: undefined,
    participants: [],
    purpose: undefined,
    challenge: undefined,
    notes: undefined,
  };
  activeCie: CompanySchema = this.emptyCie;
  newCie:boolean = true;
  id:string;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private genericService: GenericService,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.genericService.getCompanyList()
      .then(companyList => {
        this.companyList = companyList;
      });
    this.genericService.getRecrutersList()
      .then(list => {
        this.RecrutersList = list;
      });
    this.route.params.subscribe(params => {
       this.id = params['id'];
       if (this.id) {
         this.dashboardService.getJobId(this.id)
           .then(data => {
             this.base = data;
           });
       }
    });
  }

  listPosition = (text$: Observable<string>) =>
    text$
      .debounceTime(100)
      .distinctUntilChanged()
      .map(term => term.length < 1 ? []
        : this.typeOfPosition.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  toggleCie():void {
    this.newCie = !this.newCie;
    this.activeCie = this.emptyCie; // Always reset if we switch so it is easier.
  }
  spreadCie(event):void {
    // I can return an object OR a String but It cannot be match/set active on both (object Or string).
    // Take the tring and find the location associated with it.
    this.base.location = (this.base.location)? this.base.location: this.findLocation(event.target.value);
  }
  private findLocation(name:string):string {
    for(let i = 0; i < this.companyList.length; i++) {
      if(this.companyList[i].name === name) {
        return this.companyList[i].location;
      }
    }
    return;
  }
  addMetting():void {
    this.base.meeting = [...this.base.meeting, Object.assign({}, this.meetingInfo)];
  }
  remoteThisMeeting(i: number) {
    this.base.meeting = this.base.meeting.filter((item, index) => (i !== index));
  }
  removeIndexFromArray(i:number, arr:any) {
    arr.participants = arr.participants.filter((item, index) => (i !== index));
  }
  addParticipant(item:MeetingInfoSchema, name:string) {
    item.participants = [...item.participants, name];
  }
  onSubmit(form):void {
    this.base.applicationType = (this.base.recruiters) ? 'Recruiters' : 'Direct';
    this.base.location = (this.base.location) ? this.base.location: this.activeCie.location;
    // Check if New Cie, if new Cie then Merge the data. + Submit the Cie.
    if(this.activeCie.name) {
      this.base.company = this.activeCie.name;
      //Submit New Cie with basic information.
      this.companyService.saveCie(this.activeCie)
        .then(data => { this.activeCie = this.emptyCie; })
    }
    // Convert data and Post it.
    this.dashboardService.saveJob(this.base).then(answer => {
      this.submitted = true;
      this.base = this.emptyObject;
      form.reset();
    });
  }

}
