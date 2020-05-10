import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {RegisterComponent} from './register/register.component';

export const userRoutes: Routes = [
  { path : 'login' , component : LoginComponent },
  { path : 'profile' , component : ProfileComponent},
  { path : 'register' , component : RegisterComponent},
  { path : 'author', loadChildren : () => import('./author/author-routing.module').then(m => m.AuthorRoutingModule)},
  { path : 'editor', loadChildren : () => import('./editor/editor-routing.module').then(e => e.EditorRoutingModule)},
  { path : 'reviewer', loadChildren : () => import('./reviewer/reviewer-routing.module').then(r => r.ReviewerRoutingModule)}
];

export class UserRoutingModule { }
