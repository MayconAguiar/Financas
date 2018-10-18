import { Component, OnInit, Input } from '@angular/core';
import { ItemDashboard } from '../negocio/ItemDashboard';
import { Tipos } from '../tipos.enum';

@Component({
  selector: 'app-item-dashboard',
  templateUrl: './item-dashboard.component.html',
  styleUrls: ['./item-dashboard.component.scss']
})
export class ItemDashboardComponent implements OnInit {

  @Input() item: ItemDashboard;
  dicionarioTipos = [];

  constructor() {
    this.dicionarioTipos[Tipos.OPCOES] = 'Opções';
    this.dicionarioTipos[Tipos.SWING_TRADE] = 'Swing Trade';
    this.dicionarioTipos[Tipos.NAO_ATENDIDO] = 'Não Atendido';
  }

  ngOnInit() {
  }

}
