import { Component } from '@angular/core';

@Component({
  selector: 'my-root',
  template: `
    <div class="wrapper">
      <nav>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/analytic" routerLinkActive="active">Analytic</a>
        <a routerLink="/cie" routerLinkActive="active">Companies</a>
      </nav>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
      <footer>Footer</footer>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }
