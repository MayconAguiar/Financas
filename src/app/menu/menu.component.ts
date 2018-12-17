import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) {
   }

  ngOnInit() {
  }

  public logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }

  public fechadas() {
    this.router.navigate(['/fechadas']);
  }

  public alocacao() {
    this.router.navigate(['/alocacao']);
  }

  public abertas() {
    this.router.navigate(['/abertas']);
  }

  public importa() {
    this.router.navigate(['/importa']);
  }

}
