import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReviewSubsComponent} from './review-subs/review-subs.component';
import {MatCardModule} from '@angular/material/card';
import {CalendarModule, DialogModule, DropdownModule, FileUploadModule, TableModule} from 'primeng';
import {MatDividerModule} from '@angular/material/divider';
import {PaperReviewComponent} from './paper-review/paper-review.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from "@angular/forms";


const routes: Routes = [
  {path: 'submissions' , component: ReviewSubsComponent},
  {path: 'paper-review' , component: PaperReviewComponent}
];

@NgModule({
  declarations: [
    ReviewSubsComponent,
    PaperReviewComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MatCardModule,
    TableModule,
    MatDividerModule,
    CalendarModule,
    DropdownModule,
    DialogModule,
    CommonModule,
    MatButtonModule,
    FileUploadModule,
    FormsModule,
  ],
  exports: [RouterModule]
})


export class ReviewerRoutingModule { }
