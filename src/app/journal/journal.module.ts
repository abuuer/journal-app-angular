import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import {IssueComponent} from './issue/issue.component';
import {HomeComponent} from './home/home.component';
import {LatestIssuesComponent} from './issues/latest-issues/latest-issues.component';
import {AppModule} from '../app.module';
import {ArchiveComponent} from './issues/archive/archive.component';
import {Angular2UsefulSwiperModule} from 'angular2-useful-swiper';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    JournalRoutingModule,
    AppModule,
    Angular2UsefulSwiperModule
  ]
})
export class JournalModule { }
