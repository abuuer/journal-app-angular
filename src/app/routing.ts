import {JournalComponent} from './journal/journal.component';
import {LoginComponent} from './user/login/login.component';
import {Routes} from '@angular/router';
import {HomeComponent} from './journal/home/home.component';
import {LatestIssuesComponent} from './journal/issues/latest-issues/latest-issues.component';
import {UserModule} from './user/user.module';
import {ArchiveComponent} from './journal/issues/archive/archive.component';

export const routes : Routes =  [
  { path : 'home' , component : HomeComponent},
  { path : 'issues' , component : LatestIssuesComponent},
  { path : 'archive' , component : ArchiveComponent},
  { path : '', redirectTo : 'home' , pathMatch: 'full'},
  { path : 'user', loadChildren : () => import('./user/user.module').then(m => m.UserModule)}
]
