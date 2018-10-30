import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

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
    })
    .catch(c => {
      alert('Ihhh deu probleminha aqui! \n Erro: ' + c.message);
      });

    this.email = '';
    this.senha = '';
  }

  novoUsuario() {
    console.log('novo usuario');
    this.router.navigate(['/login/cadastro']);
  }
}
