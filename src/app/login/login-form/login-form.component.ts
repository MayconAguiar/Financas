import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BaseFormComponent } from '../../comum/base-form/base-form.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends BaseFormComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private formBuilder: FormBuilder) {
      super();
    }

  email = '';
  senha = '';
  formulario: FormGroup;

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      email: [ null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required]]});
  }

  novoUsuario() {
    console.log('novo usuario');
    this.router.navigate(['/login/cadastro']);
  }

  submit() {
    this.afAuth.auth.signInWithEmailAndPassword(this.formulario.value.email, this.formulario.value.senha).then(ok => {
      this.router.navigate(['/dashboard']);
    })
    .catch(c => {
      alert('Ihhh deu probleminha aqui! \n Erro: ' + c.message);
      });

    this.email = '';
    this.senha = '';
  }
}
