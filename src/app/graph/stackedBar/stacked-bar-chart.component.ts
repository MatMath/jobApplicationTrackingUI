import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

import { stackedBarCharData } from '../../classDefinition';

@Component({
  selector: 'stacked-horizontal-bar-chart',
  template: '<svg class="stackchart" width="1000" #stackchart></svg>',
  styleUrls: ['./stacked-bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StackedHoriBarChart implements OnInit, OnChanges {
  @ViewChild('stackchart') private chartContainer: ElementRef;
  @Input() private data: Array<stackedBarCharData>;
  public width:number = 1000;
  barHeight:number = 20;
  labelWidth: number = 100;
  constructor() { }

  ngOnInit() {
    if (this.data) {
      this.updateChart();
    }
  }

  ngOnChanges() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    ctx.font = "11px Arial";
    if (this.data) {
      this.labelWidth = this.data.reduce((prev, curr) => {
        const width = ctx.measureText(curr.name).width;
        return (prev > width)? prev: width;
      }, 10);
      this.labelWidth += 10; // padding
      this.updateChart();
    }
  }

  updateChart() {
    const element = this.chartContainer.nativeElement;
    const chart = d3.select(element);
    const x = d3.scaleLinear()
      .range([0, this.width - this.labelWidth])
      .domain([0, d3.max(this.data, (d) => d.value[0] )]);

    chart.attr("height", this.barHeight * this.data.length);

    chart.selectAll(".bartext")
      .data(this.data)
      .enter()
        .append("text")
        .attr("class", "bartext")
        .attr("x", 0)
        .attr("y", (d, i) => (i * this.barHeight + this.barHeight*0.6))
        .text(d => d.name);

    const bar = chart.selectAll("g")
        .data(this.data)
        .enter().append("g")
          .attr("transform", (d, i) => `translate(${this.labelWidth},${i * this.barHeight})`);

    bar.append("rect")
        .attr("width", (d) => x(d.value[0] - d.value[1]))
        .attr("height", this.barHeight - 1)
        .attr("class", "total");

    bar.append("text")
        .attr("x", (d) => x(d.value[0] - d.value[1]) - 3)
        .attr("y", this.barHeight / 2)
        .attr("dy", ".35em")
        .text((d) => d.value[0]);

    const successBar = chart.selectAll("g")
        .data(this.data)
        .enter().append("g")
          .attr("transform", (d, i) => `translate(${this.labelWidth},${i * this.barHeight})`);

    successBar.append("rect")
        .attr("width", (d) => x(d.value[1]))
        .attr("height", this.barHeight - 1)
        .attr("class", "success");

    successBar.append("text")
        .attr("x", (d) => x(d.value[1]) - 3)
        .attr("y", this.barHeight / 2)
        .attr("dy", ".35em")
        .text((d) => d.value[1]);
    };

};
