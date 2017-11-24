import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

import { barCharData } from '../../classDefinition';

@Component({
  selector: 'horizontal-bar-chart',
  template: '<svg class="horichart" #horibarchart></svg>',
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SimpleHoriBarChart implements OnInit, OnChanges {
  @ViewChild('horibarchart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  width:number = 500;
  barHeight:number = 20;
  constructor() {
    console.log('IN THE CONSTRUCTOR');

  }

  ngOnInit() {
    this.createChart();
    if (this.data) {
      this.updateChart();
    }
  }

  ngOnChanges() {
    if (this.data) {
      this.updateChart();
    }
  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    const chart = d3.select(element)
        .attr("width", this.width);
    }

  updateChart() {
    const element = this.chartContainer.nativeElement;
    const chart = d3.select(element);
    const x = d3.scaleLinear()
      .range([0, this.width])
      .domain([0, d3.max(this.data, (d) => d.value )]);

    chart.attr("height", this.barHeight * this.data.length);

    const bar = chart.selectAll("g")
        .data(this.data)
        .enter().append("g")
          .attr("transform", (d, i) => "translate(0," + i * this.barHeight + ")");

    bar.append("rect")
        .attr("width", function(d) { return x(d.value); })
        .attr("height", this.barHeight - 1);

    bar.append("text")
        .attr("x", function(d) { return x(d.value) - 3; })
        .attr("y", this.barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.value; });
    }
};
