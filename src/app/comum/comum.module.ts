import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from './dashboard.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatchMediaService } from '../match-media.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { InputFieldComponent } from './input-field/input-field.component';
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
       InputFieldComponent,
       ErrorMsgComponent
  ],
  exports: [
     NgxPaginationModule,
     InputFieldComponent,
     ErrorMsgComponent
  ],
  providers: [ DashboardService, MatchMediaService, AngularFireDatabase ]
})

export class ComumModule { }
