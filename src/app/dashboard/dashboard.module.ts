import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { DatasComponent } from './filtros/datas/datas.component';
import { GeralComponent } from './filtros/geral/geral.component';
import { TipoItemDashboardComponent } from './filtros/tipo-item-dashboard/tipo-item-dashboard.component';
import { TiposComponent } from './filtros/tipos/tipos.component';
import { ItemDashboardComponent } from './item-dashboard/item-dashboard.component';
import { ResumoComponent } from './resumo/resumo.component';
import { UploadButtonComponent } from '../upload-button/upload-button.component';
import { ItemDashboardDetalhesComponent } from './item-dashboard/item-dashboard-detalhes/item-dashboard-detalhes.component';

@NgModule({
  imports: [
    CommonModule, BrowserModule, HttpClientModule
  ],
  exports: [

  ],
  declarations: [
    DashboardComponent,
    DatasComponent,
    GeralComponent,
    TipoItemDashboardComponent,
    TiposComponent,
    ItemDashboardComponent,
    ResumoComponent,
    UploadButtonComponent,
    ItemDashboardDetalhesComponent
  ],
  providers: [ AngularFireDatabase ]
})
export class DashboardModule { }
