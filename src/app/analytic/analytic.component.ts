import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { globalStructureSchema } from '../classDefinition';
import { AnalyticService } from './analytic.service';

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
    private analyticService: AnalyticService
  ) { }

  deleteThisId(id:string): void {
    console.log('Deleting This id!!! ', id);
    this.analyticService.deleteListId(id)
    .then((data) => {
      console.log('RETURNED:', data);
      //Pop the ID from the Object instead of doing a call.
    });
  }

  ngOnInit(): void {
    this.analyticService.getJobList()
    .then((data) => {
      this.jobList = data;
    });
  }

}
