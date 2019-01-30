import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datas',
  templateUrl: './datas.component.html',
  styleUrls: ['./datas.component.scss']
})
export class DatasComponent implements OnInit {

  constructor() { }

  atual = 0;
  descricao = '';
  meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  @Output() mudoumes: EventEmitter<any> = new EventEmitter();
  @Input() inicial = 0;
  @Input() anoatual = 2017;

  ngOnInit() {
    this.atual = this.inicial;
    this.descricao = this.meses[this.atual];
  }

  obtenhaDescricao() {
    return this.meses[this.atual];
  }

  mudou(mes) {
    this.atual = mes;
    this.descricao = this.meses[mes];
    this.mudoumes.emit([mes, this.anoatual ]);
  }

  mudouAno(ano) {
    this.anoatual = ano;
    // const that = this;
    this.mudoumes.emit([this.atual, ano ]);
  }

}
