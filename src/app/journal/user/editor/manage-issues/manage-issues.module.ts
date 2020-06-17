import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageIssuesRoutingModule } from './manage-issues-routing.module';
import {ManageIssuesComponent} from './manage/manage-issue.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { AddVolumeComponent } from './add-volume/add-volume.component';
import {
  CalendarModule,
  ConfirmDialogModule, DialogModule,
  DropdownModule,
  FileUploadModule, MessageModule,
  MessagesModule, ProgressSpinnerModule,
  TableModule,
  TabViewModule
} from 'primeng';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    ManageIssuesComponent,
    AddArticleComponent,
    AddIssueComponent,
    AddVolumeComponent
  ],
  imports: [
    CommonModule,
    ManageIssuesRoutingModule,
    TableModule,
    MatCheckboxModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TabViewModule,
    MatCardModule,
    MatDividerModule,
    ConfirmDialogModule,
    MatProgressBarModule,
    MessagesModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FileUploadModule,
    DialogModule,
    MessageModule,
    MatIconModule,
    ProgressSpinnerModule
  ]
})
export class ManageIssuesModule { }
