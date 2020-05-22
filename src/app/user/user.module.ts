import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {userRoutes} from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CardModule, CheckboxModule} from 'primeng';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CheckboxModule,
    MatStepperModule,
    CardModule,
    MatInputModule
  ],
  providers: [
  ]
})
export class UserModule { }
