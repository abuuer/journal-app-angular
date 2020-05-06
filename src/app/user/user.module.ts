import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {userRoutes} from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from './profile/profile.component';
import {
  CardModule,
  CheckboxModule, DialogModule,
  DropdownModule,
  FileUploadModule,
  InputTextareaModule, PickListModule,
  RadioButtonModule,
  StepsModule
} from 'primeng';
import {MenuItem} from 'primeng/api';
import {SubmissionComponent} from './submission/submission.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from "@angular/material/radio";
import {MatTableModule} from "@angular/material/table";
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    SubmissionComponent,
    RegisterComponent
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
    DialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CardModule,
    MatIconModule,
    MatRadioModule,
    MatTableModule,
  ],
  providers: [
  ]
})
export class UserModule { }
