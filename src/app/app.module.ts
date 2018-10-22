import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import {MomentModule} from 'angular2-moment/moment.module';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemDashboardComponent } from './item-dashboard/item-dashboard.component';
import { DatasComponent } from './filtros/datas/datas.component';
import { ResumoComponent } from './resumo/resumo.component';
import { TiposComponent } from './filtros/tipos/tipos.component';
import { UploadButtonComponent } from './upload-button/upload-button.component';
import { ItemResumoComponent } from './item-resumo/item-resumo.component';
import { CurrencyFormatPipe } from './currency-format.pipe';
import localeBR from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(localeBR);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ItemDashboardComponent,
    DatasComponent,
    ResumoComponent,
    TiposComponent,
    UploadButtonComponent,
    ItemResumoComponent,
    CurrencyFormatPipe
  ],
  imports: [
    BrowserModule, MomentModule, HttpClientModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
