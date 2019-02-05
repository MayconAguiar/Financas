import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ItemDashboard } from '../negocio/ItemDashboard';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { MatchMediaService } from '../match-media.service';
import { Resumo } from '../negocio/Resumo';
import { DashboardService } from '../comum/dashboard.service';


@Component({
  selector: 'app-evolucao-patrimonial',
  templateUrl: './evolucao-patrimonial.component.html',
  styleUrls: ['./evolucao-patrimonial.component.scss']
})
export class EvolucaoPatrimonialComponent implements OnInit, AfterViewInit {

  constructor(
    private servico: DashboardService,
    private matchMediaService: MatchMediaService) {
      this.conteudoGraficoObservable = this.conteudoGraficoBehaviorSubject.asObservable();
  }

  status = true;
  carregadoValores = false;
  conteudoGraficoObservable: Observable<any>;
  conteudoGraficoBehaviorSubject = new BehaviorSubject<any>([[], []]);
  // itensAberto: any = { itens: [], quantidade: 1};
  // items: ItemDashboard[];
  original: ItemDashboard[] = [];
  exibirDetalhesGeral = false;
  itensDoAno: ItemDashboard[];
  anoSelecionado = 2019;

  meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  ngOnInit() {
  }

  private obtenhaItens(ano, mes) {
    return this.original
    .filter(x =>  {
      return x.saida.ObtenhaData() !== undefined
      && x.saida.ObtenhaData().getFullYear() === ano
      && x.saida.ObtenhaData().getMonth() === mes;
    });
  }

  ngAfterViewInit() {
    const that = this;
    this.servico.obtenhaDashBoards().subscribe(itens => {
      this.original = itens;
      this.carregue();
      that.carregadoValores = true;
    });
  }

  flip() {
      this.status = !this.status;
  }

  carregue() {

    const valores = [];
    const descricoes = [];
    const resumos: Resumo[] = [];

    for (let index = 0; index < 12; index++) {
      const items = this.obtenhaItens(this.anoSelecionado, index);
      const resumo = new Resumo(items);
      resumos.push(resumo);
      valores.push(Math.round(resumo.lucroLiquido));
      descricoes.push(this.meses[index]);
    }
    this.conteudoGraficoBehaviorSubject.next([ descricoes, valores, resumos]);
  }

  public mudouFiltro(mesAno) {
    this.anoSelecionado = Number(mesAno[1]);
    this.carregue();
  }
}
