import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from './dashboard.service';
import { AngularFireDatabase } from 'angularfire2/database';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ DashboardService, AngularFireDatabase ]
})
export class ComumModule { }
