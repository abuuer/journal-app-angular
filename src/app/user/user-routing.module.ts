import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {SubmissionComponent} from './submission/submission.component';
import {RegisterComponent} from './register/register.component';


export const userRoutes: Routes = [
  { path : 'login' , component : LoginComponent },
  { path : 'profile' , component : ProfileComponent},
  { path : 'submission' , component : SubmissionComponent},
  { path : 'register' , component : RegisterComponent},
];

export class UserRoutingModule { }
