import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppSettings } from './config';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GenericService } from './generic/generic.service';
import { NgbdModalContent } from './generic/confirmModal';

import { DashboardService } from './dashboard/dashboard.service';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AnalyticComponent } from './analytic/analytic.component';
import { AnalyticService } from './analytic/analytic.service';

import { CompanyComponent } from './company/company.component';
import { CompanyService } from './company/company.service';

@NgModule({
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    AnalyticComponent,
    CompanyComponent,
    NgbdModalContent,
  ],
  providers: [
    DashboardService,
    AnalyticService,
    GenericService,
    CompanyService,
    AppSettings,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ NgbdModalContent ]
})
export class AppModule { }
