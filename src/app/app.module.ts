import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';


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
// import { UploadButtonComponent } from './upload-button/upload-button.component';

AngularFireModule.initializeApp(FirebaseConfig);

registerLocaleData(localeBR);

@NgModule({
  declarations: [
    AppComponent,
    CurrencyFormatPipe
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, DashboardModule, ImportaArquivoModule
  ],
  providers: [FinanceService, { provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
