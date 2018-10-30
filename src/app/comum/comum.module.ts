import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from './dashboard.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatchMediaService } from '../match-media.service';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule, NgxPaginationModule
  ],
  exports: [
    NgxPaginationModule
  ],
  declarations: [],
  providers: [ DashboardService, MatchMediaService, AngularFireDatabase ]
})
export class ComumModule { }
