import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {RegisterComponent} from './register/register.component';
import {SubmissionService} from '../controller/service/submission.service';
import {EditorService} from '../controller/service/editor.service';
import {ReviewerService} from '../controller/service/reviewer.service';
import {UserService} from '../controller/service/user.service';

export const userRoutes: Routes = [
  { path : 'login' , component : LoginComponent },
  { path : 'profile' , component : ProfileComponent, canActivate: [UserService]},
  { path : 'register' , component : RegisterComponent},
  { path : 'author', loadChildren : () => import('./author/author-routing.module').then(m => m.AuthorRoutingModule),
    canActivate : [SubmissionService]},
  { path : 'editor', loadChildren : () => import('./editor/editor-routing.module').then(e => e.EditorRoutingModule),
    canActivate : [EditorService]},
  { path : 'reviewer', loadChildren : () => import('./reviewer/reviewer-routing.module').then(r => r.ReviewerRoutingModule),
    canActivate : [ReviewerService]}
];

export class UserRoutingModule { }
