import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ItemDashboard } from '../negocio/ItemDashboard';
import { GerenciadorDeArquivos } from '../gerenciadores/gerenciadorDeArquivos';
import { Gerenciador } from '../gerenciadores/gerenciador';
import moment = require('moment');
import { Resumo } from '../negocio/Resumo';
import { Tipos } from '../tipos.enum';
import {Observable, BehaviorSubject} from 'rxjs/Rx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  itemsAsObservable: Observable<ItemDashboard[]>;
  resumo: Observable<Resumo>;
  items: ItemDashboard[];
  original: ItemDashboard[] = [];
  
  mesSelecionado: 0;
  itensBehavior = new BehaviorSubject<ItemDashboard[]>([]);
  resumoBehavior = new BehaviorSubject<Resumo>(null);
  telaInicialBehavior = new BehaviorSubject<ItemDashboard[]>([]);
  

  ngOnInit() {
    ///this.inicial.subscribe(x => this.telaInicial());
    this.itemsAsObservable = this.itensBehavior.asObservable();
    this.resumo = this.resumoBehavior.asObservable(); 
    ///this.telaInicialBehavior.subscribe(x => this.telaInicial());
  }

  public mudouFiltro(mes) {
    this.mesSelecionado = mes;
    this.items =  this.original.filter(x => x.saida.data !== undefined && x.saida.data.month() === Number(mes));
    this.resumoBehavior.next(new Resumo(this.items));
    this.itensBehavior.next(this.items);
  }

  private telaInicial() {
    debugger;
    let mesAnterior = new Date().getMonth() - 1;
    mesAnterior = mesAnterior === -1 ? 11: mesAnterior;
    this.mudouFiltro(mesAnterior)
  }

  public selecionouTipo(tipo: string){
    
    const codigo = Tipos[tipo];
    this.mudouFiltro(this.mesSelecionado);
    
    if (codigo !== Tipos.TODOS) {
      const teste = this.items.filter(x => x.tipo === codigo);
      this.items = teste;
      this.resumoBehavior.next(new Resumo(this.items));
    }

    this.itensBehavior.next(this.items);
  }

  public changeListener(files: FileList) {

    const operacoes = new GerenciadorDeArquivos(files);
    operacoes.processe().subscribe(x => {
      this.items = new Gerenciador(x).obtenha();
      this.original = this.items;
      this.itensBehavior.next(this.items);
      this.resumoBehavior.next(new Resumo(this.items));
    });
  }

}
