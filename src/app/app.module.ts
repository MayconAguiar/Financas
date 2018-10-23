import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';


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
import { FinanceService } from './finance.service';
import { ItemEmAbertoDashboardComponent } from './item-em-aberto-dashboard/item-em-aberto-dashboard.component';
import { TipoItemDashboardComponent } from './filtros/tipo-item-dashboard/tipo-item-dashboard.component';
import { ItemDashboardDetalhesComponent } from './item-dashboard-detalhes/item-dashboard-detalhes.component';
import { GeralComponent } from './filtros/geral/geral.component';
import { FirebaseConfig } from './../environments/firebase.config';
import { AngularFireModule } from 'angularfire2/index';

AngularFireModule.initializeApp(FirebaseConfig);

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
    CurrencyFormatPipe,
    ItemEmAbertoDashboardComponent,
    TipoItemDashboardComponent,
    ItemDashboardDetalhesComponent,
    GeralComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [FinanceService, { provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
