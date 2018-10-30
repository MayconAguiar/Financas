import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from '@angular/fire';
import { FirebaseConfig } from '../../environments/firebase.config';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AppRoutingModule } from '../app-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(FirebaseConfig)
  ],
  declarations: [LoginComponent, CadastroComponent, LoginFormComponent],
  exports: [LoginComponent, CadastroComponent],
  providers: [ AngularFireAuth ]
})
export class LoginModule { }
