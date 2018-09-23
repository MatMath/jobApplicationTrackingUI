import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { barCharData, stackedBarCharData } from '../classDefinition';
import { GraphService } from './graph.service';

@Component({
  selector: 'my-graph-page',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GlobGraphComponent implements OnInit{
  smallStepGraph: barCharData[];
  websiteWeight: stackedBarCharData[];

  constructor(
    private graphService: GraphService,
    private notification: NotificationsService,
  ){}

  ngOnInit() {
    // give everything a chance to get loaded before starting the animation to reduce choppiness
    this.graphService.getTitleWeight().then(data => {
      this.smallStepGraph = data.map(item => ({name: item._id, value: item.count}));
    }).catch(() => this.notification.error( 'Error', 'Gerring the Title info'));

    this.graphService.getWebsiteWeight().then(data => {
      this.websiteWeight = data.map(item => ({
        name: item._id,
        value: [item.count, item.answer_receive]
      }));
    }).catch(() => this.notification.error( 'Error', 'Gerring the Website Weight info'));
  }
}
