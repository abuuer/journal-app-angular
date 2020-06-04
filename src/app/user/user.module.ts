import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {userRoutes} from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CardModule, CheckboxModule, MessagesModule} from 'primeng';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import { PaperReviewComponent } from './reviewer/paper-review/paper-review.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CheckboxModule,
    MatStepperModule,
    CardModule,
    MatInputModule,
    MatProgressBarModule,
    MessagesModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule
  ],
  providers: [
  ]
})
export class UserModule { }
