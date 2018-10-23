import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.scss']
})

export class TiposComponent implements OnInit {

  @Output() selecionouTipo: EventEmitter<string> = new EventEmitter();

  tipoSelecionado = 'TODOS';

  constructor() { }

  ngOnInit() {
  }

  selecionou(codigo: string) {
    this.tipoSelecionado = codigo;
    this.selecionouTipo.emit(codigo);
  }

}
