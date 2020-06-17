import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes, RouterModule } from '@angular/router';
import {SubmissionComponent} from './main-submission/submission.component';
import {SubmissionTableComponent} from './submission-table/submission-table.component';
import {
  CalendarModule, CardModule, CheckboxModule,
  DialogModule,
  DropdownModule, FileUploadModule,
  MessagesModule,
  PickListModule, RadioButtonModule,
  StepsModule,
  TableModule
} from 'primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';


const routes: Routes = [
  { path : 'submission' , component : SubmissionComponent},
  { path : 'statistics' , component : SubmissionTableComponent},
];

@NgModule({
  declarations: [
    SubmissionComponent,
    SubmissionTableComponent,
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
    CommonModule,
    InputTextareaModule,
    CheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule
  ],
  exports: [RouterModule]
})


export class AuthorRoutingModule {}
