import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ItemDashboard } from '../negocio/ItemDashboard';
import { Observable } from 'rxjs/internal/Observable';
import { observable } from 'rxjs/internal/symbol/observable';

@Component({
  selector: 'app-grafico-detalhes',
  templateUrl: './grafico-detalhes.component.html',
  styleUrls: ['./grafico-detalhes.component.scss']
})
export class GraficoDetalhesComponent implements OnInit {

  constructor() { }

  @Input() observableItens: Observable<ItemDashboard[]>;
  itens: ItemDashboard[];

  ngOnInit() {
    this.observableItens.subscribe(x => this.itens = this.splitIntoSubArray(x, 3));
  }

  private splitIntoSubArray(arr, count) {
    const newArray = [];
    while (arr.length > 0) {
      newArray.push(arr.splice(0, count));
    }
    return newArray;

  }

}
