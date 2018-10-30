import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const estaAutenticado =  this.afAuth.auth.currentUser !== null;

      if (!estaAutenticado) {
        this.router.navigate(['/login']);
      }

      const foiConfirmado = this.afAuth.auth.currentUser.emailVerified;

      if (!foiConfirmado) {
        alert('Confirme o e-mail para acessar');
        this.router.navigate(['/login']);
      }

      return estaAutenticado && foiConfirmado;
  }
}

