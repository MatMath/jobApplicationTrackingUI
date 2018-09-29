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
    const palette = new Rickshaw.Color.Palette({ scheme: 'cool' });
    if (!this.series) { return; }
    this.series = this.series.map((serie, i) => {
      if (!serie.color) {
        serie.color = palette.color();
      }
      return serie;
    })
    const graph = new Rickshaw.Graph( {
      renderer: 'bar',
      element: document.querySelector('#myRick'),
      series: this.series
    } );

    graph.render();
  }
}
