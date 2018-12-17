import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from './dashboard.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatchMediaService } from '../match-media.service';
import {NgxPaginationModule} from 'ngx-pagination';
<<<<<<< HEAD
=======
import { InputFieldComponent } from './input-field/input-field.component';
>>>>>>> 5af5eae764228960217e1885bdd3b7fafab3d7de
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMsgComponent } from './error-msg/error-msg.component';

@NgModule({
  imports: [
     CommonModule,
     NgxPaginationModule,
     FormsModule,
     ReactiveFormsModule
  ],
  declarations: [
<<<<<<< HEAD
  ],
  exports: [
     NgxPaginationModule
=======
       InputFieldComponent,
       ErrorMsgComponent
  ],
  exports: [
     NgxPaginationModule,
     InputFieldComponent,
     ErrorMsgComponent
>>>>>>> 5af5eae764228960217e1885bdd3b7fafab3d7de
  ],
  providers: [ DashboardService, MatchMediaService, AngularFireDatabase ]
})

export class ComumModule { }
