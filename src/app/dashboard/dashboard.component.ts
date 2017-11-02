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
    private _service: NotificationsService,
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
      .then(companyList => { this.companyList = companyList; })
      .catch(() => this._service.error( 'Error', 'Gerring the Company list'));

    this.genericService.getRecrutersList()
      .then(list => { this.RecrutersList = list; })
      .catch(() => this._service.error( 'Error', 'Gerring the Recruiters list'));

    this.route.params.subscribe(params => {
       this.id = params['id'];
       if (this.id) {
         this.dashboardService.getJobId(this.id)
           .then(data => {
             this.base = data;
             this.newCie = true;
           })
           .catch(() => this._service.error( 'Error', 'Gerring the Job info'));;
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
    this.submitting = true;
    this.base.applicationType = (this.base.recruiters) ? 'Recruiters' : 'Direct';
    this.base.location = (this.base.location) ? this.base.location: this.activeCie.location;
    // Check if New Cie, if new Cie then Merge the data. + Submit the Cie.
    if(this.activeCie.name) {
      this.base.company = this.activeCie.name;
      //Submit New Cie with basic information.
      this.companyService.saveCie(this.activeCie)
        .then(data => { this.activeCie = this.emptyCie; })
        .catch(err => this._service.error( 'Could not save this new Company', err))
    }
    // Convert data and Post it.
    this.dashboardService.saveJob(this.base).then(answer => {
      this.submitted = true;
      this.base = this.emptyObject;
      form.reset();
      this.submitting = false;
    })
    .catch((err:string) => {
      this._service.error( 'Could not save the file', err)
      this.submitting = false;
    });
  }

}
