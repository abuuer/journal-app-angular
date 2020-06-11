
import {Routes} from '@angular/router';
import {HomeComponent} from './journal/home/home.component';
import {JournalComponent} from './journal/journal.component';
import {LoginComponent} from './sign/login/login.component';
import {LatestIssuesComponent} from './journal/issues/latest-issues/latest-issues.component';
import {AllIssuesComponent} from './journal/issues/all-issues/all-issues.component';
import {RegisterConfComponent} from './sign/register-conf/register-conf.component';
import {RegisterComponent} from './sign/register/register.component';

export const routes : Routes =  [
  { path : '', redirectTo : 'journal' , pathMatch: 'full'},
  { path : 'journal' , component: JournalComponent, children:[
      { path : 'home' , component : HomeComponent},
      { path : 'latest-issue' , component : LatestIssuesComponent},
      { path : 'all-issues' , component : AllIssuesComponent},
      { path : '', redirectTo : 'home' , pathMatch: 'full'},
     { path : 'user', loadChildren : () => import('./journal/user/user.module').then(m => m.UserModule)}
    ]},
      { path : 'login' , component : LoginComponent},
      { path : 'register' , component : RegisterComponent},
      { path : 'confirm' , component : RegisterConfComponent},
]
