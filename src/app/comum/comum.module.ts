import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from './dashboard.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatchMediaService } from '../match-media.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DatasComponent } from './filtros/datas/datas.component';

@NgModule({
  imports: [
     CommonModule,
     NgxPaginationModule,
     FormsModule,
     ReactiveFormsModule
  ],
  declarations: [
    DatasComponent
  ],
  exports: [
     NgxPaginationModule, DatasComponent
  ],
  providers: [ DashboardService, MatchMediaService, AngularFireDatabase ]
})

export class ComumModule { }
