import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { BaseFormComponent } from '../../comum/base-form/base-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { FormValidations } from '../../comum/form-validations';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent  extends BaseFormComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private formBuilder: FormBuilder) {
    super();
   }

  email = '';
  senha = '';

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: [ null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required]],
      confirmacao: [null, [FormValidations.equalsTo('email')]]});
  }

  submit() {
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
