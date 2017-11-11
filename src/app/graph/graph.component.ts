import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-graph-page',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  ngOnInit() {
    console.log('Graph component initiated');
  }
}
