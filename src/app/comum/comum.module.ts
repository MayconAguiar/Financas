import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from './dashboard.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatchMediaService } from '../match-media.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ DashboardService, MatchMediaService, AngularFireDatabase ]
})
export class ComumModule { }
