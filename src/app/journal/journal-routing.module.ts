import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './mjt/home/home.component';
import {LatestIssuesComponent} from './issues/latest-issues/latest-issues.component';
import {AllIssuesComponent} from './issues/all-issues/all-issues.component';


const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule { }
