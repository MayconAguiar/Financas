import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Tipos } from '../../tipos.enum';

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
    //debugger;
    //const itemTeste = Tipos;
    //const tipo: Tipos = itemTeste[codigo];
    this.tipoSelecionado = codigo;
    this.selecionouTipo.emit(codigo);
  }

}
