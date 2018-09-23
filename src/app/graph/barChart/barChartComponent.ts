import { Component } from '@angular/core';

// import { barCharData } from '../classDefinition';

import * as Rickshaw from 'rickshaw';

@Component({
  selector: 'bar-chart',
  template: '<div id="myRick"></div>'
})
export class BarChart {
  constructor(){}

  ngOnInit() {
    const graph = new Rickshaw.Graph( {
      renderer: 'bar',
      element: document.querySelector('#myRick'),
      series: [
        {
          color: 'steelblue',
          data: [ { x: 0, y: 23}, { x: 1, y: 15 }, { x: 2, y: 79 } ]
        }, {
          color: 'lightblue',
          data: [ { x: 0, y: 30}, { x: 1, y: 20 }, { x: 2, y: 64 } ]
        }
      ]
    } );

    graph.render();
  }
}
