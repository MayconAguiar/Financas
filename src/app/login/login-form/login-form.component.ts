import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgControl, NgModel } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BaseFormComponent } from '../../comum/base-form/base-form.component';
import { Usuario } from '../models/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  usuario = new Usuario();

  ngOnInit() {
  }

  novoUsuario() {
    console.log('novo usuario');
    this.router.navigate(['/login/cadastro']);
  }

  onSubmit() {
    this.afAuth.auth.signInWithEmailAndPassword(this.usuario.email, this.usuario.senha).then(ok => {
      this.router.navigate(['/dashboard']);
    })
    .catch(c => {
      alert('Ihhh deu probleminha aqui! \n Erro: ' + c.message);
      });
  }

  mostrarErro(control: NgModel) {
    return !control.valid && control.touched;
  }
}
