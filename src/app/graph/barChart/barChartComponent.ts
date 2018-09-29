import { Component, OnInit, Input } from '@angular/core';

import { GraphSchema } from './graphDefinition';

import * as Rickshaw from 'rickshaw';

@Component({
  selector: 'bar-chart',
  template: '<div id="myRick"></div>'
})
export class BarChart implements OnInit{
  @Input() private series: GraphSchema[];

  ngOnInit() {
    if (!this.series) {
      console.log('FUCK IT')
      return;
    }
    const graph = new Rickshaw.Graph( {
      renderer: 'bar',
      element: document.querySelector('#myRick'),
      series: this.series
    } );

    graph.render();
  }
}
