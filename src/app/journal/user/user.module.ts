import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule} from '@angular/router';
import {userRoutes} from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from './profile/profile.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CardModule, CheckboxModule, MessagesModule} from 'primeng';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    ProfileComponent,
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
        MatInputModule,
        MatProgressBarModule,
        MessagesModule,
        MatButtonModule,
        MatDividerModule,
        MatCardModule,
        MatIconModule
    ],
  providers: [
  ]
})
export class UserModule { }
