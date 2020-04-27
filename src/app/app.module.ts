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
import { LoginComponent } from './journal/login/login.component';
import {routes} from './routing';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './journal/home/home.component';
import { IssueDetailComponent } from './journal/issues/issue-detail/issue-detail.component';

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
    LoginComponent,
    HomeComponent,
    IssueDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Angular2UsefulSwiperModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [JournalService],
  bootstrap: [JournalComponent],
})
export class AppModule { }
