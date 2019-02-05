import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  activeTab = 'fechadas';

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
    this.activeTab = 'fechadas';
    this.router.navigate(['/fechadas']);
  }

  public alocacao() {
    this.activeTab = 'alocacao';
    this.router.navigate(['/alocacao']);
  }

  public evolucao() {
    this.activeTab = 'evolucao';
    this.router.navigate(['/evolucao']);
  }

  public abertas() {
    this.activeTab = 'abertas';
    this.router.navigate(['/abertas']);
  }

  public importa() {
    this.activeTab = 'importa';
    this.router.navigate(['/importa']);
  }

}
