import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

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
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  companyList: CompanySchema[] = [];
  RecrutersList: RecruitersInfoSchema[] = [];
  websiteList: string[] = ['', 'Indeed', 'Linkedin', 'ZipRecruters', 'IrishJob.ie','Email', 'NA'];  // TODO: get from API
  typeOfPosition: string[] = ['Front End Eng', 'NodeJs Eng', 'Senior Front-end', 'Senior Backend', 'Fullstack', 'Senior Fullstack']; // TODO: get from API
  companyNameList: string[];
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
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [0, 0],
      },
      properties: {
        name: undefined,
      }
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
  template: '<simple-notifications [options]="options"></simple-notifications>'
  submitting: boolean = false;

  constructor(
    private notification: NotificationsService,
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private genericService: GenericService,
    private companyService: CompanyService
  ) { }

  public options = {
    position: ["top", "left"],
    timeOut: 0,
    lastOnBottom: true,
  };

  ngOnInit(): void {
    this.genericService.getCompanyList()
      .then(companyList => {
        this.companyList = companyList;
        this.companyNameList = companyList.map(item => item.name);
      })
      .catch(() => this.notification.error( 'Error', 'Gerring the Company list'));

    this.genericService.getRecrutersList()
      .then(list => { this.RecrutersList = list; })
      .catch(() => this.notification.error( 'Error', 'Gerring the Recruiters list'));

    this.route.params.subscribe(params => {
       this.id = params['id'];
       if (this.id) {
         this.dashboardService.getJobId(this.id)
           .then(data => {
             this.base = data;
             this.newCie = true;
           })
           .catch(() => this.notification.error( 'Error', 'Gerring the Job info'));;
       }
    });
  }

  listPosition = (text$: Observable<string>) =>
    text$
      .debounceTime(100)
      .distinctUntilChanged()
      .map(term => term.length < 1 ? []
        : this.typeOfPosition.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  listCie = (text$: Observable<string>) =>
    text$
      .debounceTime(100)
      .distinctUntilChanged()
      .map(term => term.length < 1 ? []
          : this.companyNameList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  toggleCie():void {
    this.newCie = !this.newCie;
    this.activeCie = this.emptyCie; // Always reset if we switch so it is easier.
  }
  spreadCie(name):void {
    // I can return an object OR a String but It cannot be match/set active on both (object Or string).
    // Take the tring and find the location associated with it.
    this.base.location = (this.base.location)? this.base.location: this.findLocation(name);
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
    this.submitting = true;
    const pleaseWait = this.notification.success( 'Saving', '');
    this.base.applicationType = (this.base.recruiters) ? 'Recruiters' : 'Direct';
    this.base.location = (this.base.location) ? this.base.location: this.activeCie.location;
    // Check if New Cie, if new Cie then Merge the data. + Submit the Cie.
    if(this.activeCie.name) {
      this.base.company = this.activeCie.name;
      //Submit New Cie with basic information.
      this.companyService.saveCie(this.activeCie)
        .then(data => {
          this.activeCie = this.emptyCie;
          this.notification.success( 'New company saved', '', { timeOut: 2000, showProgressBar: true } )
        })
        .catch(err => this.notification.error( 'Could not save this new Company', err))
    }
    // Convert data and Post it.
    this.dashboardService.saveJob(this.base).then(answer => {
      this.submitted = true;
      this.base = this.emptyObject;
      form.reset();
      this.submitting = false;
      this.notification.remove(pleaseWait.id);
    })
    .catch((err:string) => {
      this.notification.remove(pleaseWait.id);
      this.notification.error( 'Could not save the file', err)
      this.submitting = false;
    });
  }

}
