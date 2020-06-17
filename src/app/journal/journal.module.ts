import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import {IssueComponent} from './issue/issue.component';
import {HomeComponent} from './mjt/home/home.component';
import {LatestIssuesComponent} from './issues/latest-issues/latest-issues.component';
import {AppModule} from '../app.module';
import {AllIssuesComponent} from './issues/all-issues/all-issues.component';
import {Angular2UsefulSwiperModule} from 'angular2-useful-swiper';
import { PublicationAndEthicsComponent } from './mjt/publication-and-ethics/publication-and-ethics.component';
import { TermsAndConditionsComponent } from './mjt/terms-and-conditions/terms-and-conditions.component';
import { LicensingComponent } from './mjt/licensing/licensing.component';
import { ArticleComponent } from './mjt/article/article.component';


@NgModule({
  declarations: [
  PublicationAndEthicsComponent,
  TermsAndConditionsComponent,
  LicensingComponent,
  ArticleComponent,
  ],
  imports: [
    CommonModule,
    JournalRoutingModule,
    AppModule,
    Angular2UsefulSwiperModule
  ]
})
export class JournalModule { }
