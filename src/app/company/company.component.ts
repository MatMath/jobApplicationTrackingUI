import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

// Types
import { CompanySchema, RecruitersInfoSchema } from '../classDefinition';

// Custom Files
import { GenericService } from '../generic/generic.service';
import { CompanyService } from './company.service';
import { NgbdModalContent } from '../generic/confirmModal';

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
  activeCie: CompanySchema = this.emptyCie;
  showCie:boolean = false;

  RecrutersList: RecruitersInfoSchema[];
  emptyRecruters: RecruitersInfoSchema = {
    _id: undefined,
    cie: undefined,
    name: undefined,
    notes: undefined,
  };
  activeRecruters: RecruitersInfoSchema = {...this.emptyRecruters};
  showRecruters:boolean = false;
  showList:boolean = true;
  submitting:boolean = false;
  public options = {
    position: ["top", "left"],
    timeOut: 0,
    lastOnBottom: true,
  };

  constructor(
    private notification: NotificationsService,
    private genericService: GenericService,
    private companyService: CompanyService,
    private modalService: NgbModal,
  ) {}
  private removeIdFromList = (list, id:string) => list.filter(item => (item._id !== id))

  ngOnInit():void {
    this.genericService.getCompanyList()
      .then(companyList => {
        this.companyList = companyList;
      })
      .catch(() => this.notification.error( 'Error', 'Getting the Company list'));
    this.genericService.getRecrutersList()
      .then(list => {
        this.RecrutersList = list;
      })
      .catch(() => this.notification.error( 'Error', 'Getting the Recruiters list'));;
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
    this.activeCie = {...this.emptyCie};
    this.activeRecruters = {...this.emptyRecruters};
  }

  // Company Section
  confirmCDelete(obj:CompanySchema) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.id = obj._id;
    modalRef.componentInstance.name = obj.name;
    modalRef.componentInstance.description = obj.location;
    modalRef.componentInstance.callback = this.deleteCieId.bind(this); // Otherwise This is not This it is That... Hate Class and Bind(this) crap.
  }
  deleteCieId(id):void {
    this.companyService.deleteCieId(id)
      .then(data => {
        this.companyList = this.removeIdFromList(this.companyList, id);
        this.activeCie = {...this.emptyCie};
      })
      .catch(() => this.notification.error( 'Error', 'Deleting data unsuccessful'));
  }
  editThisCie(company:CompanySchema):void {
    this.activeCie = company;
    this.activeRecruters = {...this.emptyRecruters};
    this.showList = false;
    this.showCie = true;
    this.showRecruters = false;
  }

  submitCie():void {
    this.submitting = true;
    const pleaseWait = this.notification.success( 'Saving', '');
    this.activeCie.gps.properties.name = this.activeCie.name;
    this.companyService.saveCie(this.activeCie)
      .then(data => {
        if (!this.activeCie._id) {
          this.companyList.push(this.activeCie);
        }
        this.activeCie = {...this.emptyCie};
        this.listView();
        this.submitting = false;
        this.notification.remove(pleaseWait.id);
      })
      .catch(() => {
        this.notification.remove(pleaseWait.id);
        this.notification.error( 'Error', 'Submitting the data');
        this.submitting = false;
      });
  }

  // Recruiters Section
  confirmRDelete(obj:RecruitersInfoSchema) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.id = obj._id;
    modalRef.componentInstance.name = obj.name;
    modalRef.componentInstance.description = obj.cie;
    modalRef.componentInstance.callback = this.deleteRecruId.bind(this); // Otherwise This is not This it is That... Hate Class and Bind(this) crap.
  }
  deleteRecruId(id:string):void {
    this.companyService.deleteRecruId(id)
      .then(data => {
        this.RecrutersList = this.removeIdFromList(this.RecrutersList, id);
        this.activeRecruters = {...this.emptyRecruters};
      })
      .catch(() => this.notification.error( 'Error', 'Deleting data unsuccessful'));
  }
  editThisRecruters(item:RecruitersInfoSchema):void {
    this.activeCie = this.emptyCie;
    this.activeRecruters = item;
    this.showList = false;
    this.showCie = false;
    this.showRecruters = true;
  }
  submitRecru():void {
    this.submitting = true;
    const pleaseWait = this.notification.success( 'Saving', '');
    this.companyService.saveRecru(this.activeRecruters)
      .then(data => {
        if (!this.activeRecruters._id) {
          this.RecrutersList.push(this.activeRecruters);
        }
        this.activeRecruters = {...this.emptyRecruters};
        this.listView();
        this.submitting = false;
        this.notification.remove(pleaseWait.id);
      })
      .catch(() => {
        this.notification.remove(pleaseWait.id);
        this.notification.error( 'Error', 'Submitting the data');
        this.submitting = false;
      });
  }

}
