import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import moment = require('moment');

@Component({
  selector: 'app-datas',
  templateUrl: './datas.component.html',
  styleUrls: ['./datas.component.scss']
})
export class DatasComponent implements OnInit {

  constructor() { }

  atual = 0;
  meses;
  descricao = '';

  @Output() mudoumes: EventEmitter<number> = new EventEmitter();

  ngOnInit() {
    this.atual = new Date().getMonth() - 1;
    this.atual = this.atual === -1 ? 11: this.atual;
    moment.locale('pt-br');
    this.meses = moment.months();
    this.descricao = this.meses[this.atual];
    this.mudoumes.emit(this.atual);
  }

  mudou(mes) {
    this.descricao = this.meses[mes];
    this.mudoumes.emit(mes);
  }

}
