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

  @Output() mudoumes: EventEmitter<number> = new EventEmitter();
  @Input() inicial = 0;

  ngOnInit() {
    // this.atual = new Date().getMonth() - 1;
    // this.atual = this.atual === -1 ? 11 : this.atual;
    // this.descricao = this.meses[this.atual];
    // this.mudoumes.emit(this.atual);
    this.atual = this.inicial;
    this.descricao = this.meses[this.atual];
  }

  obtenhaDescricao() {
    return this.meses[this.atual];
  }

  mudou(mes) {
    this.descricao = this.meses[mes];
    this.mudoumes.emit(mes);
  }

}
