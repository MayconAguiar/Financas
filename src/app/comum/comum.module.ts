import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from './dashboard.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatchMediaService } from '../match-media.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { BaseFormComponent } from './base-form/base-form.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
     CommonModule,
     NgxPaginationModule,
     FormsModule,
     ReactiveFormsModule
  ],
  declarations: [
       CampoControlErroComponent,
       ErrorMsgComponent,
       FormDebugComponent,
       InputFieldComponent
  ],
  exports: [
     NgxPaginationModule,
     FormDebugComponent,
     CampoControlErroComponent,
     ErrorMsgComponent,
     InputFieldComponent
  ],
  providers: [ DashboardService, MatchMediaService, AngularFireDatabase ]
})

export class ComumModule { }
