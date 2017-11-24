import { Component, OnInit } from '@angular/core';
import APP_CONFIG from './graph.config';
import { Node, Link } from './d3';
import { NotificationsService } from 'angular2-notifications';

import { barCharData } from '../classDefinition';
import { GraphService } from './graph.service';

@Component({
  selector: 'my-graph-page',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GlobGraphComponent implements OnInit{
  nodes: Node[] = [];
  links: Link[] = [];
  smallStepGraph: barCharData[];

  constructor(
    private graphService: GraphService,
    private notification: NotificationsService,
  ) {
    const N = APP_CONFIG.N;

    /** constructing the nodes array */
    for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i));
    }

    for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        /** increasing connections toll on connecting nodes */
        this.nodes[i - 1].linkCount++;
        this.nodes[(i * m) - 1].linkCount++;

        /** connecting the nodes before starting the simulation */
        this.links.push(new Link(i, i * m));
      }
    }
  }
  ngOnInit() {
    // give everything a chance to get loaded before starting the animation to reduce choppiness
    this.graphService.getTitleWeight().then(data => {
      this.smallStepGraph = data.map(item => ({name: item._id, value: item.count}));
    }).catch(() => this.notification.error( 'Error', 'Gerring the Title info'));
  }
}
