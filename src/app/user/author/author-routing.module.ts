import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import {SubmissionComponent} from './main-submission/submission.component';
import {SubmissionTableComponent} from './submission-table/submission-table.component';
import {
  CalendarModule, CardModule,
  DialogModule,
  DropdownModule, FileUploadModule,
  MessagesModule,
  PickListModule, RadioButtonModule,
  StepsModule,
  TableModule
} from 'primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {BrowserModule} from '@angular/platform-browser';


const routes: Routes = [
  { path : 'submission' , component : SubmissionComponent},
  { path : 'statistics' , component : SubmissionTableComponent},
];

@NgModule({
  declarations: [
    SubmissionComponent,
    SubmissionTableComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    TableModule,
    CalendarModule,
    DropdownModule,
    StepsModule,
    MessagesModule,
    PickListModule,
    FormsModule,
    DialogModule,
    CardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    RadioButtonModule,
    FileUploadModule,
    MatCardModule,
    CommonModule
  ],
  exports: [RouterModule]
})


export class AuthorRoutingModule { }
