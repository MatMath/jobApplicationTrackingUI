import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../classDefinition';

@Component({
  selector: 'my-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.css']
})
export class AnalyticComponent implements OnInit {
  error: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

}
