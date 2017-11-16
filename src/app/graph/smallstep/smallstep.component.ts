import * as d3 from 'd3';
import { Component, ElementRef, Input, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
// import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';

import { barCharData } from '../../classDefinition';

@Component({
  selector: 'small-step',
  template: '<svg #smallstep></svg>',
  styleUrls: ['./smallstep.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SmallStepComponent implements OnInit {
  @ViewChild('smallstep') private chartContainer: ElementRef;
  @Input() private data: any[];
  margin:any = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 40
  };
  width:number = 700 - this.margin.left - this.margin.right;
  height:number = 300 - this.margin.top - this.margin.bottom;

  ngOnInit() {
    this.createChart();
    if (this.data) {
      this.updateChart();
    }
  }

  createChart() {
    const { height, width, margin } = this;

    const element = this.chartContainer.nativeElement;
    const x = d3.scaleBand()
        .range([0, width])
        .round(true);

    const y = d3.scaleLinear()
        .range([height, 0]);

    const chart = d3.select(element)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  }

  updateChart() {
    const element = this.chartContainer.nativeElement;
    const { data, width, height } = this;
    const chart = d3.select(element);
    const barWidth = width / data.length;

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, d => d.value)])

    const x = d3.scaleBand()
      .domain([0, d3.max(data, d => d.value)])
      .range([0, width])
      .padding(0.1)
      .round(true);

    x.domain(data.map(d => d.name));
    y.domain([0, d3.max(data, d => d.value)]);

    const yAxis = d3.axisLeft(y);
    const xAxis = d3.axisBottom(x).tickFormat(d => d);

      chart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      chart.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      chart.selectAll(".bar")
          .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.value))
            .attr("height", d => height - y(d.value))
            .attr("width", x.bandwidth());

  }
}
