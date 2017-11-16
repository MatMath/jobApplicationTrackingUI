import * as d3 from 'd3';
import { Component, ElementRef, Input, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
// import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'small-step',
  template: '<svg class="smallstep" #smallstep></svg>',
  styleUrls: ['./smallstep.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SmallStepComponent implements OnInit {
  @ViewChild('smallstep') private chartContainer: ElementRef;
  @Input() private data: number[];
  tableWidth:number = 800;
  barHeight:number = 20;
  ngOnInit() {
    if (this.data) {
      this.createChart();
    }
  }

  createChart() {
    const { data, barHeight, tableWidth } = this;

    const x = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, this.tableWidth]); // Add max window / container / media width.

    const element = this.chartContainer.nativeElement;
    const chart = d3.select(".smallstep")
        .attr("width", tableWidth)
        .attr("height", barHeight * data.length);

    const bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
        .attr("width", x)
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", function(d) { return (x(d) - 3); })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d; });
  }
}
