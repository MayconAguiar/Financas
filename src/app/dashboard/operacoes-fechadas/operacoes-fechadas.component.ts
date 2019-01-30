import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ItemDashboard } from '../../negocio/ItemDashboard';
import { Resumo } from '../../negocio/Resumo';
import {Observable, BehaviorSubject} from 'rxjs/Rx';
import { DashboardService } from '../../comum/dashboard.service';


@Component({
  selector: 'app-operacoes-fechadas',
  templateUrl: './operacoes-fechadas.component.html',
  styleUrls: ['./operacoes-fechadas.component.scss']
})
export class OperacoesFechadasComponent implements OnInit {

  constructor(private servico: DashboardService) {
    this.mesSelecionado = this.obtenhaMesAtual();
    this.anoSelecionado = this.obtenhaAnoAtual();
    this.tipoSelecionado = 'swing trade';
  }

  itemsAsObservable: Observable<ItemDashboard[]>;
  resumo: Observable<Resumo>;
  items: ItemDashboard[];
  original: ItemDashboard[] = [];
  exibirDetalhesGeral = false;

  mesSelecionado: number;
  anoSelecionado: number;
  tipoSelecionado: string;
  itensBehavior = new BehaviorSubject<ItemDashboard[]>([]);
  itensAbertoBehavior = new BehaviorSubject<ItemDashboard[]>([]);
  resumoBehavior = new BehaviorSubject<Resumo>(null);
  telaInicialBehavior = new BehaviorSubject<ItemDashboard[]>([]);

  ngOnInit() {
    this.itemsAsObservable = this.itensBehavior.asObservable();
    this.resumo = this.resumoBehavior.asObservable();
    this.Inicie();
  }

  public mudouFiltro(mesAno) {
    this.mesSelecionado = mesAno[0];
    this.anoSelecionado = Number(mesAno[1]);
    this.tipoSelecionado = mesAno[2];
    this.items =  this.obtenhaItens(Number(this.mesSelecionado), this.anoSelecionado, this.tipoSelecionado);
    // console.log('itens sem entrada:');
    // console.log(this.obtenhaSaidasSemEntradas(Number(mes)));
    this.resumoBehavior.next(new Resumo(this.items));
    this.itensBehavior.next(this.items);
  }

  private Inicie() {
    this.servico.obtenhaDashBoards().subscribe(itens => {
      this.original = itens;
      this.items =  this.obtenhaItens(this.mesSelecionado, this.anoSelecionado, this.tipoSelecionado);
      console.log(this.items);
      console.log('itens sem entrada:');
      console.log(this.obtenhaSaidasSemEntradas(this.mesSelecionado, this.anoSelecionado));
      this.itensBehavior.next(this.items);
      this.resumoBehavior.next(new Resumo(this.items));
    });
  }

  private obtenhaItens(mes, ano, tipo) {
    // const teste = this.original.filter(x => x.entrada.papeis[0].empresa === 'BRASIL');

    return this.original
    .filter(x =>  {
      return x.saida.ObtenhaData() !== undefined
      && x.saida.ObtenhaData().getMonth() === Number(mes)
      && x.saida.ObtenhaData().getFullYear() === ano
      && (tipo === 'swing trade' ? x.entrada.data !==  x.saida.data :
      x.entrada.data ===  x.saida.data);
    });
  }

  private obtenhaSaidasSemEntradas(mes, ano) {
    return this.original
    .filter(x =>  {
      return x.saida.ObtenhaData() !== undefined && !x.entrada.existeValor()
      && x.saida.ObtenhaData().getMonth() === Number(mes)
      && x.saida.ObtenhaData().getMonth() === ano;
    });
  }

  private obtenhaMesAtual() {
    return new Date().getMonth();
  }

  private obtenhaAnoAtual() {
    return new Date().getFullYear();
  }
}
