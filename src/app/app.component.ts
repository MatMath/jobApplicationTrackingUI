import { Component } from '@angular/core';

@Component({
  selector: 'my-root',
  template: `
    <nav class="container">
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/analytic" routerLinkActive="active">Analytic</a>
      <a routerLink="/cie" routerLinkActive="active">Companies</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }
