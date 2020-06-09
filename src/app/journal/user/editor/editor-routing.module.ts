import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManageSubsComponent} from './manage-subs/manage-subs.component';
import {
  CalendarModule,
  CardModule,
  ConfirmDialogModule,
  DialogModule,
  DropdownModule,
  MessagesModule,
  TableModule
} from 'primeng';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {ManageReviewersComponent} from './manage-reviewers/manage-reviewers.component';
import {ManageAuthorsComponent} from './manage-authors/manage-authors.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';


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
        MatButtonModule, CommonModule, MessagesModule, ConfirmDialogModule, MatProgressBarModule],
  exports: [RouterModule]
})


export class EditorRoutingModule { }
