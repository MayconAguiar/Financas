import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { CurrencyFormatPipe } from './currency-format.pipe';
import localeBR from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FinanceService } from './finance.service';
import { FirebaseConfig } from './../environments/firebase.config';
import { AngularFireModule } from 'angularfire2/index';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ImportaArquivoModule } from './importa-arquivo/importa-arquivo.module';
import { CotacaoAtualComponent } from './cotacao-atual/cotacao-atual.component';
import { CotacaoAtualItemComponent } from './cotacao-atual-item/cotacao-atual-item.component';

AngularFireModule.initializeApp(FirebaseConfig);

registerLocaleData(localeBR);

@NgModule({
  declarations: [
    AppComponent,
    CotacaoAtualComponent,    
    CotacaoAtualItemComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    AppRoutingModule, 
    DashboardModule, 
    ImportaArquivoModule,
    FormsModule
  ],
  providers: [FinanceService, { provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
