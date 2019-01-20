import { Component, OnInit, Input } from '@angular/core';

import { GraphSchema } from './graphDefinition';

import * as Rickshaw from 'rickshaw';

@Component({
  selector: 'bar-chart',
  styleUrls: ['./barChart.scss'],
  template: `<div id="rickshaw_container">
    <div id="y_axis"></div>
    <div id="chart"></div>
	  <div id="x_axis"></div>
  </div>`
})
export class BarChart implements OnInit{
  @Input() private series: GraphSchema[];
  @Input() private xaxis: string[];

  ngOnInit() {
    const palette = new Rickshaw.Color.Palette({ scheme: 'cool' });

    // Graph Building
    if (!this.series) { return; }
    this.series = this.series.map((serie, i) => {
      if (!serie.color) {
        serie.color = palette.color();
      }
      return serie;
    })
    const graph = new Rickshaw.Graph( {
      renderer: 'bar',
      height: 300,
	    width: 800,
      element: document.getElementById('chart'),
      series: this.series
    } );

    // // X-Axis Building
    const format = function(n) {
    	let map = {
    		0: 'zero',
    		1: 'first',
    		2: 'second',
    		3: 'third',
    		4: 'fourth'
    	};
    	return map[n];
    }
    let x_ticks = new Rickshaw.Graph.Axis.X( {
    	graph: graph,
    	orientation: 'bottom',
    	element: document.getElementById('x_axis'),
    	pixelsPerTick: 50,
    	tickFormat: format
    } );

    graph.render();
  }
}
