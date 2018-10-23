import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tipo-item-dashboard',
  templateUrl: './tipo-item-dashboard.component.html',
  styleUrls: ['./tipo-item-dashboard.component.scss']
})
export class TipoItemDashboardComponent implements OnInit {

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
