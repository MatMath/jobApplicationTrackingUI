import { Component, OnInit, Input } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

// Custom
import { JobListService } from './joblist.service';
import { NgbdModalContent } from '../generic/confirmModal';

// Types Definition
import { globalStructureSchema } from '../classDefinition';

@Component({
  selector: 'my-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.scss']
})
export class JobListComponent implements OnInit {
  jobList: globalStructureSchema[];
  error: any;
  filterBy: string;

  // Pagination param
  collectionSize: number;
  pageSize:number = 30;
  page: number = 1;
  fromNbr:number = 0;
  toNbr:number = this.pageSize;

  public options = {
    position: ["top", "left"],
    timeOut: 0,
    lastOnBottom: true,
  };

  constructor(
    private notification: NotificationsService,
    private router: Router,
    private joblistService: JobListService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.joblistService.getJobList()
    .then((data) => {
      this.jobList = data;
      this.collectionSize = data.length;
    })
    .catch(() => this.notification.error( 'Error', 'Gerring the Job list'));
  }

  deleteThisId(id:string): void {
    const pleaseWait = this.notification.success( 'Networking...', '');
    this.joblistService.deleteListId(id)
    .then((data) => {
      this.jobList = this.removeIdFromList(this.jobList, id);
      //Pop the ID from the Object instead of doing a call.
      this.notification.remove(pleaseWait.id);
    })
    .catch(() => {
      this.notification.remove(pleaseWait.id);
      this.notification.error( 'Error', 'Deleting data unsuccessful')
    });
  }

  confirmDelete(obj:globalStructureSchema) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.id = obj._id;
    modalRef.componentInstance.name = obj.company;
    modalRef.componentInstance.description = obj.title;
    modalRef.componentInstance.callback = this.deleteThisId.bind(this); // Otherwise This is not This it is That... Hate Class and Bind(this) crap.
  }

  goToEditJobDetails(id) {
    this.router.navigate(['/dashboard', id]);
  }

  private removeIdFromList = (list:globalStructureSchema[], id:string):globalStructureSchema[] => list.filter(item => (item._id !== id))


  switchPageTo(nbr:number):void {
    this.fromNbr = (nbr - 1)*this.pageSize;
    this.toNbr = nbr*this.pageSize;
  }

}
