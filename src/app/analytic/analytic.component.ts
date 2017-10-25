import { Component, OnInit, Input } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { globalStructureSchema } from '../classDefinition';
import { AnalyticService } from './analytic.service';
import { NgbdModalContent } from '../generic/confirmModal';

@Component({
  selector: 'my-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.css']
})
export class AnalyticComponent implements OnInit {
  jobList: globalStructureSchema[];
  error: any;

  constructor(
    private router: Router,
    private analyticService: AnalyticService,
    private modalService: NgbModal,
  ) { }

  deleteThisId(id:string): void {
    this.analyticService.deleteListId(id)
    .then((data) => {
      this.jobList = this.removeIdFromList(this.jobList, id);
      //Pop the ID from the Object instead of doing a call.
    });
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }

  goToEditJobDetails(id) {
    this.router.navigate(['/dashboard', id]);
  }

  private removeIdFromList = (list:globalStructureSchema[], id:string):globalStructureSchema[] => list.filter(item => (item._id !== id))

  ngOnInit(): void {
    this.analyticService.getJobList()
    .then((data) => {
      this.jobList = data;
    });
  }

}
