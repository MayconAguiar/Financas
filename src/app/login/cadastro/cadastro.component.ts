import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  email = '';
  senha = '';

  ngOnInit() {
  }

  cadastre() {
    const that = this;

    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.senha)
    .then(userCredential => {
      userCredential.user.sendEmailVerification();
      alert('Foi enviado um email para confirmação do cadastro');
      that.afAuth.auth.signOut();
      that.router.navigate(['']);
    })
    .catch(c => {
      alert('Ihhh deu probleminha aqui! \n Erro: ' + c.message);
      });
  }
}