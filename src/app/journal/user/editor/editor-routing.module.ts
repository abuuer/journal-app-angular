import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManageSubsComponent} from './manage-subs/manage-subs.component';
import {TableModule} from 'primeng/table';
import {
  CalendarModule,
  CardModule,
  ConfirmDialogModule,
  DialogModule,
  DropdownModule,
  MessagesModule,
  TabViewModule, TreeTableModule
} from 'primeng';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {ManageReviewersComponent} from './manage-reviewers/manage-reviewers.component';
import {ManageAuthorsComponent} from './manage-authors/manage-authors.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from "@angular/material/checkbox";


const routes: Routes = [
  {path: 'manage-subs' , component: ManageSubsComponent},
  {path: 'manage-reviewers' , component: ManageReviewersComponent},
  {path: 'manage-authors' , component: ManageAuthorsComponent},
];

@NgModule({
  declarations: [
    ManageSubsComponent,
    ManageReviewersComponent,
    ManageAuthorsComponent,
  ],
    imports: [RouterModule.forChild(routes),
        TableModule,
        CalendarModule,
        DropdownModule,
        MatCardModule,
        MatTableModule,
        MatDividerModule,
        DialogModule,
        CardModule,
        MatButtonModule, CommonModule, MessagesModule, ConfirmDialogModule, MatProgressBarModule, TabViewModule, TreeTableModule, MatRadioModule, FormsModule, MatCheckboxModule],
  exports: [RouterModule]
})


export class EditorRoutingModule { }
