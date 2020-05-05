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
import { IssueDetailComponent } from './journal/issues/issue-detail/issue-detail.component';
import {UserService} from './controller/service/user.service';
import { FormsModule} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import {MenuItem} from 'primeng/api';
import {AccordionModule} from 'primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    IssueDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Angular2UsefulSwiperModule,
    AccordionModule,
    BrowserAnimationsModule,
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
    UserService
  ],
  bootstrap: [JournalComponent],
})
export class AppModule {
}
