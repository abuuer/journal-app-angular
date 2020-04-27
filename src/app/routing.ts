import {JournalComponent} from './journal/journal.component';
import {LoginComponent} from './journal/login/login.component';
import {Routes} from '@angular/router';
import {HomeComponent} from './journal/home/home.component';
import {IssueDetailComponent} from './journal/issues/issue-detail/issue-detail.component';

export const routes : Routes =  [
  { path : 'home' , component : HomeComponent},
  { path : 'Issues' , component : IssueDetailComponent},
  { path : 'Login' , component : LoginComponent},
  { path : '', redirectTo : 'home' , pathMatch: 'full'}
]
