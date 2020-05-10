import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReviewSubsComponent} from './review-subs/review-subs.component';
import {MatCardModule} from '@angular/material/card';
import {CalendarModule, DialogModule, DropdownModule, TableModule} from 'primeng';
import {MatDividerModule} from '@angular/material/divider';


const routes: Routes = [
  {path: 'submissions' , component: ReviewSubsComponent}
];

@NgModule({
  declarations: [
    ReviewSubsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    MatCardModule,
    TableModule,
    MatDividerModule,
    CalendarModule,
    DropdownModule,
    DialogModule,
  ],
  exports: [RouterModule]
})


export class ReviewerRoutingModule { }
