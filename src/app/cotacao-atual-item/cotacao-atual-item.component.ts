import { Component, OnInit } from '@angular/core';
import { ItemAcao } from '../negocio/ItemAcao';
import { Input } from '@angular/core';

@Component({
  selector: 'app-cotacao-atual-item',
  templateUrl: './cotacao-atual-item.component.html',
  styleUrls: ['./cotacao-atual-item.component.scss']
})

export class CotacaoAtualItemComponent implements OnInit {

  constructor() { }

  @Input() item: ItemAcao;
  @Input() desabilitarCodigo: boolean;
  @Input() desabilitarValor: boolean;

  ngOnInit() {
  }

}
