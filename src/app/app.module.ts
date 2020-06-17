import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { JournalComponent } from './journal/journal.component';
import { NavComponent } from './journal/navbar/nav/nav.component';
import { HeaderComponent } from './journal/navbar/header/header.component';
import { FooterComponent } from './journal/navbar/footer/footer.component';
import {Angular2UsefulSwiperModule} from 'angular2-useful-swiper';
import { IssueComponent } from './journal/issue/issue.component';
import {JournalService} from './controller/service/journal.service';
import {routes} from './routing';
import {RouterModule} from '@angular/router';
import {UserService} from './controller/service/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    AccordionModule,
    CardModule,
    InputTextareaModule,
    MessagesModule, ProgressSpinnerModule, TreeModule,
} from 'primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AllIssuesComponent } from './journal/issues/all-issues/all-issues.component';
import {LatestIssuesComponent} from './journal/issues/latest-issues/latest-issues.component';
import {AuthService} from './controller/service/auth.service';
import {SubmissionService} from './controller/service/submission.service';
import { authInterceptorProviders } from './controller/helper/auth.interceptor';
import {EditorService} from './controller/service/editor.service';
import {ReviewerService} from './controller/service/reviewer.service';
import {LoginComponent} from './sign/login/login.component';
import {RegisterConfComponent} from './sign/register-conf/register-conf.component';
import {RegisterComponent} from './sign/register/register.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {HomeComponent} from './journal/mjt/home/home.component';
import {GuidlineComponent} from './journal/mjt/guidline/guidline.component';
import {RightsComponent} from './journal/mjt/rights/rights.component';
import {MjtComponent} from './journal/mjt/mjt.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    JournalComponent,
    AllIssuesComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    IssueComponent,
    LoginComponent,
    RegisterConfComponent,
    RegisterComponent,
    HomeComponent,
    GuidlineComponent,
    RightsComponent,
    MjtComponent,
    LatestIssuesComponent
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
        }),
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatIconModule,
        MatProgressBarModule,
        MessagesModule,
        MatStepperModule,
        CardModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        MatTabsModule,
        TreeModule,
        ProgressSpinnerModule,
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
  bootstrap: [AppComponent],
  exports: [
    IssueComponent
  ]
})
export class AppModule {
}
