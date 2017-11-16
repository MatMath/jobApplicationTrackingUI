import { Component, OnInit } from '@angular/core';
import APP_CONFIG from './graph.config';
import { Node, Link } from './d3';

import { barCharData } from '../classDefinition';

@Component({
  selector: 'my-graph-page',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GlobGraphComponent implements OnInit{
  nodes: Node[] = [];
  links: Link[] = [];
  chartData: Array<any>;
  smallStepGraph: barCharData[] = [
  {name: "a", value: 1},
  {name: "b", value: 2},
  {name: "c", value: 3},
  {name: "d", value: 4},
  {name: "e", value: 5},
  {name: "f", value: 6},
  {name: "g", value: 15},
  {name: "h", value: 5},
  {name: "i", value: 4},
  {name: "j", value: 6},
  {name: "K", value: 2},
  {name: "l", value: 3},
  {name: "M", value: 4},
  {name: "N", value: 5},
  {name: "O", value: 4},
  {name: "P", value: 15},
  {name: "Q", value: 4},
  {name: "R", value: 2}
];

  constructor() {
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
    setTimeout(() => {
      this.generateData();

      // change the data periodically
      setInterval(() => this.generateData(), 3000);
    }, 1000);
  }

  generateData() {
    this.chartData = [];
    for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
      this.chartData.push([
        `Index ${i}`,
        Math.floor(Math.random() * 100)
      ]);
    }
  }
}
