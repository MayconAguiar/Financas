import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from '@angular/fire';
import { FirebaseConfig } from '../../environments/firebase.config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(FirebaseConfig)
  ],
  declarations: [LoginFormComponent, LoginComponent],
  exports: [LoginFormComponent, LoginComponent],
  providers: [ AngularFireAuth ]
})
export class LoginModule { }
