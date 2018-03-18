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

import { JobListComponent } from './joblist/joblist.component';
import { JobListService } from './joblist/joblist.service';
import { JobListPipe } from './joblist/joblist.pipe';

import { CompanyComponent } from './company/company.component';
import { CompanyService } from './company/company.service';

// Graph
import { GlobGraphComponent } from './graph/graph.component';
import { GraphService } from './graph/graph.service';
import { D3Service, D3_DIRECTIVES } from './graph/d3';

import { SmallStepComponent } from './graph/smallstep/smallstep.component';
import { SimpleHoriBarChart } from './graph/SimpleHoriBarChart/bar-chart.component';


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
    JobListComponent,
    CompanyComponent,
    NgbdModalContent,
    GlobGraphComponent,
    ...D3_DIRECTIVES,
    SmallStepComponent,
    SimpleHoriBarChart,
    JobListPipe,
  ],
  providers: [
    DashboardService,
    JobListService,
    GenericService,
    CompanyService,
    AppSettings,
    D3Service,
    GraphService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ NgbdModalContent ]
})
export class AppModule { }
