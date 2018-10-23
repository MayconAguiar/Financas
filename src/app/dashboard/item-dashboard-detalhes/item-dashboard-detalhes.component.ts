import { Component, OnInit, Input } from '@angular/core';
import { ResumoIndividual } from '../../negocio/ResumoIndividual';


@Component({
  selector: 'app-item-dashboard-detalhes',
  templateUrl: './item-dashboard-detalhes.component.html',
  styleUrls: ['./item-dashboard-detalhes.component.scss']
})
export class ItemDashboardDetalhesComponent implements OnInit {

  exibirDetalhes = false;

  @Input() item: ResumoIndividual;
  @Input() exibirDetalhesGeral: boolean;

  constructor() { }

  ngOnInit() {
  }

  detalhar(){
    this.exibirDetalhes = !this.exibirDetalhes;
  }

}
