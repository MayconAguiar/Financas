import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ItemDashboard } from '../negocio/ItemDashboard';

@Component({
  selector: 'app-grafico-detalhes',
  templateUrl: './grafico-detalhes.component.html',
  styleUrls: ['./grafico-detalhes.component.scss']
})
export class GraficoDetalhesComponent implements OnInit {

  constructor() { }

  @Input() itens: ItemDashboard[];

  ngOnInit() {
  }

}
