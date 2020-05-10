import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManageSubsComponent} from './manage-subs/manage-subs.component';
import {CalendarModule, CardModule, DialogModule, DropdownModule, TableModule} from 'primeng';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


const routes: Routes = [
  {path: 'manage' , component: ManageSubsComponent}
];

@NgModule({
  declarations: [
    ManageSubsComponent,
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
    MatButtonModule],
  exports: [RouterModule]
})


export class EditorRoutingModule { }
