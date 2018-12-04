import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from '@angular/fire';
import { FirebaseConfig } from '../../environments/firebase.config';
import { AppRoutingModule } from '../app-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComumModule } from '../comum/comum.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComumModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(FirebaseConfig)
  ],
  declarations: [
    LoginComponent,
    LoginFormComponent],
  exports: [
    LoginComponent],
  providers: [ AngularFireAuth ]
})
export class LoginModule { }
