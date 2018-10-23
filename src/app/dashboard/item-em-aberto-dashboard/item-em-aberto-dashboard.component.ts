import { Component, OnInit, Input } from '@angular/core';
import { ItemDashboard } from '../../negocio/dashboard/ItemDashboard';
import { Tipos } from '../../tipos.enum';

@Component({
  selector: 'app-item-em-aberto-dashboard',
  templateUrl: './item-em-aberto-dashboard.component.html',
  styleUrls: ['./item-em-aberto-dashboard.component.scss']
})

export class ItemEmAbertoDashboardComponent implements OnInit {

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
