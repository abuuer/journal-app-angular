
import {Routes} from '@angular/router';
import {HomeComponent} from './journal/mjt/home/home.component';
import {JournalComponent} from './journal/journal.component';
import {LoginComponent} from './sign/login/login.component';
import {LatestIssuesComponent} from './journal/issues/latest-issues/latest-issues.component';
import {AllIssuesComponent} from './journal/issues/all-issues/all-issues.component';
import {RegisterConfComponent} from './sign/register-conf/register-conf.component';
import {RegisterComponent} from './sign/register/register.component';
import {MjtComponent} from './journal/mjt/mjt.component';
import {GuidlineComponent} from './journal/mjt/guidline/guidline.component';
import {RightsComponent} from './journal/mjt/rights/rights.component';
import {PublicationAndEthicsComponent} from './journal/mjt/publication-and-ethics/publication-and-ethics.component';
import {TermsAndConditionsComponent} from './journal/mjt/terms-and-conditions/terms-and-conditions.component';
import {LicensingComponent} from './journal/mjt/licensing/licensing.component';
import {ArticleComponent} from './journal/mjt/article/article.component';

export const routes : Routes =  [
  { path : '', redirectTo : 'journal' , pathMatch: 'full'},
  { path : 'journal' , component: JournalComponent, children:[
      { path : 'mjt' , component : MjtComponent, children: [
          { path : 'guidelines' , component : GuidlineComponent},
          { path : 'author-rights' , component : RightsComponent},
          { path : 'home' , component : HomeComponent},
          { path : 'article' , component : ArticleComponent},
          { path : 'publication-and-ethics' , component : PublicationAndEthicsComponent},
          { path : 'terms-and-conditions' , component : TermsAndConditionsComponent},
          { path : 'licensing' , component : LicensingComponent},
          { path : '', redirectTo : 'home' , pathMatch: 'full'},
        ]},
      { path : 'issue' , component : LatestIssuesComponent},
      { path : 'all-issues' , component : AllIssuesComponent},
      { path : '', redirectTo : 'mjt' , pathMatch: 'full'},
     { path : 'user', loadChildren : () => import('./journal/user/user.module').then(m => m.UserModule)}
    ]},
      { path : 'login' , component : LoginComponent},
      { path : 'register' , component : RegisterComponent},
      { path : 'confirm' , component : RegisterConfComponent},
]
