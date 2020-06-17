import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManageIssuesComponent} from './manage/manage-issue.component';
import {AddArticleComponent} from './add-article/add-article.component';
import {AddIssueComponent} from './add-issue/add-issue.component';
import {AddVolumeComponent} from './add-volume/add-volume.component';


const routes: Routes = [
  { path : 'add' , component : ManageIssuesComponent},
  { path : 'add-article' , component : AddArticleComponent},
  { path : 'add-issue' , component : AddIssueComponent},
  { path : 'add-volume' , component : AddVolumeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageIssuesRoutingModule { }
