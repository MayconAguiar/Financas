import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.component.html',
  styleUrls: ['./geral.component.scss']
})
export class GeralComponent implements OnInit {

  constructor() { }
  @Output() exibir: EventEmitter<boolean> = new EventEmitter();
  exibirDetalhes = false;

  ngOnInit() {
  }

  click() {    
    this.exibirDetalhes = !this.exibirDetalhes;
    this.exibir.emit(this.exibirDetalhes);
  }
}
