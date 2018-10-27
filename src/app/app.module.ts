import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import localeBR from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FinanceService } from './finance.service';
import { FirebaseConfig } from './../environments/firebase.config';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ImportaArquivoModule } from './importa-arquivo/importa-arquivo.module';
import { CotacaoAtualComponent } from './cotacao-atual/cotacao-atual.component';
import { CotacaoAtualItemComponent } from './cotacao-atual-item/cotacao-atual-item.component';
import { PipesModule } from './pipes/pipes.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { AuthGuard } from './authGuard';
import { MenuComponent } from './menu/menu.component';


registerLocaleData(localeBR);

@NgModule({
  declarations: [
    AppComponent,
    CotacaoAtualComponent,
    CotacaoAtualItemComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DashboardModule,
    ImportaArquivoModule,
    FormsModule,
    PipesModule,
    LoginModule,
    AngularFireModule.initializeApp(FirebaseConfig)
  ],
  providers: [
    FinanceService,
    AuthGuard,
    AngularFireDatabase,
    { provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
