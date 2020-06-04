import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { JournalComponent } from './journal/journal.component';
import { NavComponent } from './navbar/nav/nav.component';
import { HeaderComponent } from './navbar/header/header.component';
import { FooterComponent } from './navbar/footer/footer.component';
import {Angular2UsefulSwiperModule} from 'angular2-useful-swiper';
import { IssueComponent } from './journal/issue/issue.component';
import {JournalService} from './controller/service/journal.service';
import {routes} from './routing';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './journal/home/home.component';
import {UserService} from './controller/service/user.service';
import { FormsModule} from '@angular/forms';
import {AccordionModule, InputTextareaModule} from 'primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ArchiveComponent } from './journal/issues/archive/archive.component';
import {LatestIssuesComponent} from './journal/issues/latest-issues/latest-issues.component';
import { ManageSubsComponent } from './user/editor/manage-subs/manage-subs.component';
import {AuthService} from './controller/service/auth.service';
import {SubmissionService} from './controller/service/submission.service';
import { authInterceptorProviders } from './controller/helper/auth.interceptor';
import {SubmissionComponent} from './user/author/main-submission/submission.component';
import {EditorService} from './controller/service/editor.service';
import {ReviewerService} from './controller/service/reviewer.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    JournalComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    IssueComponent,
    HomeComponent,
    LatestIssuesComponent,
    ArchiveComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Angular2UsefulSwiperModule,
    AccordionModule,
    BrowserAnimationsModule,
    InputTextareaModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    JournalService,
    UserService,
    AuthService,
    SubmissionService,
    EditorService,
    ReviewerService,
    authInterceptorProviders
  ],
  bootstrap: [JournalComponent],
})
export class AppModule {
}
