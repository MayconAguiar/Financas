import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
<<<<<<< HEAD
=======
import { FormBuilder, FormGroup, NgControl, NgModel } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BaseFormComponent } from '../../comum/base-form/base-form.component';
import { Usuario } from '../models/user';
>>>>>>> 5af5eae764228960217e1885bdd3b7fafab3d7de

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

<<<<<<< HEAD
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) {
    }

  email = '';
  senha = '';
=======
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  usuario = new Usuario();
>>>>>>> 5af5eae764228960217e1885bdd3b7fafab3d7de

  ngOnInit() {
  }

  novoUsuario() {
    console.log('novo usuario');
    this.router.navigate(['/login/cadastro']);
  }

<<<<<<< HEAD
  submit(f) {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.senha).then(ok => {
=======
  onSubmit() {
    this.afAuth.auth.signInWithEmailAndPassword(this.usuario.email, this.usuario.senha).then(ok => {
>>>>>>> 5af5eae764228960217e1885bdd3b7fafab3d7de
      this.router.navigate(['/dashboard']);
    })
    .catch(c => {
      alert('Ihhh deu probleminha aqui! \n Erro: ' + c.message);
      });
  }

<<<<<<< HEAD
    // this.email = '';
    // this.senha = '';
=======
  mostrarErro(control: NgModel) {
    return !control.valid && control.touched;
>>>>>>> 5af5eae764228960217e1885bdd3b7fafab3d7de
  }
}
