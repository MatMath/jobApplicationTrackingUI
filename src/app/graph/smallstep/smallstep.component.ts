import * as d3 from 'd3';
import { Component, ElementRef, Input, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
// import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'small-step',
  template: '<div class="smallstep" #smallstep></div>',
  styleUrls: ['./smallstep.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SmallStepComponent implements OnInit {
  @ViewChild('smallstep') private chartContainer: ElementRef;
  @Input() private data: Array<any>;

  ngOnInit() {
    if (this.data) {
      this.createChart();
    }
  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    d3.select(element)
    .selectAll("div")
    .data(this.data)
      .enter()
      .append("div")
      .style("width", (d) => (d + "px"))
      .text((d) => d);
  }
}
