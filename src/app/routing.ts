import {JournalComponent} from './journal/journal.component';
import {LoginComponent} from './user/login/login.component';
import {Routes} from '@angular/router';
import {HomeComponent} from './journal/home/home.component';
import {IssueDetailComponent} from './journal/issues/issue-detail/issue-detail.component';
import {UserModule} from './user/user.module';

export const routes : Routes =  [
  { path : 'home' , component : HomeComponent},
  { path : 'issues' , component : IssueDetailComponent},
  { path : '', redirectTo : 'home' , pathMatch: 'full'},
  { path : 'user', loadChildren : () => import('./user/user.module').then(m => m.UserModule)}
]
