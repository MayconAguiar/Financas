import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from './dashboard.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatchMediaService } from '../match-media.service';
import {NgxPaginationModule} from 'ngx-pagination';
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
  ],
  exports: [
     NgxPaginationModule
  ],
  providers: [ DashboardService, MatchMediaService, AngularFireDatabase ]
})

export class ComumModule { }
