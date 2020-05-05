import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {userRoutes} from './user-routing.module';
import {FormsModule} from '@angular/forms';
import {ProfileComponent} from './profile/profile.component';
import {
  CheckboxModule,
  DropdownModule,
  FileUploadModule,
  InputTextareaModule, PickListModule,
  RadioButtonModule,
  StepsModule
} from 'primeng';
import {MenuItem} from 'primeng/api';
import {SubmissionComponent} from './submission/submission.component';


@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    SubmissionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    FormsModule,
    CheckboxModule,
    StepsModule,
    RadioButtonModule,
    InputTextareaModule,
    FileUploadModule,
    DropdownModule,
    PickListModule,
  ],
  providers: [
  ]
})
export class UserModule { }
