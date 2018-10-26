import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  email = '';
  senha = '';

  ngOnInit() {
  }

  logar() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.senha).then(ok => {
      this.router.navigate(['/dashboard']);
    });

    this.email = '';
    this.senha = '';
  }
}
