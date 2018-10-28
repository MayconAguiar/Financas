import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ItemDashboard } from '../../negocio/ItemDashboard';
import { GerenciadorDeArquivos } from '../../gerenciadores/gerenciadorDeArquivos';
import { Gerenciador } from '../../gerenciadores/gerenciador';
import { Resumo } from '../../negocio/Resumo';
import { Tipos } from '../../tipos.enum';
import {Observable, BehaviorSubject} from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs/Subscriber';
import { TipoDashboard } from '../../tipo-dashboard.enum';
import { ItemAcao } from '../../negocio/ItemAcao';
import { ItemArquivo } from '../../importa-arquivo/arquivos/itemArquivo';
import { DashboardService } from '../../comum/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private servico: DashboardService ) { }

    itemsAsObservable: Observable<ItemDashboard[]>;
    itemsAbertoAsObservable: Observable<ItemDashboard[]>;
    resumo: Observable<Resumo>;
    items: ItemDashboard[];
    itemsAberto: ItemDashboard[];
    original: ItemDashboard[] = [];
    // dicionarioDeAcoes = [];
    valoresAtuais;
    exibirDetalhesGeral = false;

    mesSelecionado: 0;
    itensBehavior = new BehaviorSubject<ItemDashboard[]>([]);
    itensAbertoBehavior = new BehaviorSubject<ItemDashboard[]>([]);
    resumoBehavior = new BehaviorSubject<Resumo>(null);
    telaInicialBehavior = new BehaviorSubject<ItemDashboard[]>([]);

    ngOnInit() {
      this.itemsAsObservable = this.itensBehavior.asObservable();
      this.itemsAbertoAsObservable = this.itensAbertoBehavior.asObservable();
      this.resumo = this.resumoBehavior.asObservable();
      this.Inicie();
    }

    public mudouFiltro(mes) {
      this.mesSelecionado = mes;
      this.items =  this.original.filter(x => x.saida.ObtenhaData() !== undefined && x.saida.ObtenhaData().getMonth() === Number(mes));
      this.resumoBehavior.next(new Resumo(this.items));
      this.itensBehavior.next(this.items);
    }

    public selecionouTipo(tipo: string) {
      const codigo = Tipos[tipo];
      this.mudouFiltro(this.mesSelecionado);

      if (codigo !== Tipos.TODOS) {
        const teste = this.items.filter(x => x.tipo === codigo);
        this.items = teste;
        this.resumoBehavior.next(new Resumo(this.items));
      }

      this.itensBehavior.next(this.items);
    }

    public selecionouTipoItemDashboard(tipo: string) {
      const codigo = TipoDashboard[tipo];

      const teste = this.items.filter(x => x.tipo === codigo);

      if (codigo === TipoDashboard.EM_ABERTO) {

        this.itensBehavior.next([]);
        this.itensAbertoBehavior.next(this.itemsAberto);

      } else if (codigo === TipoDashboard.FECHADA) {

        this.itensAbertoBehavior.next([]);
        this.itensBehavior.next(this.items);

      } else  {

        this.itensBehavior.next(this.items);
        this.itensAbertoBehavior.next(this.itemsAberto);

      }
    }

    private Inicie() {
      this.servico.obtenhaDashBoards().subscribe(itens => {
        this.items = itens;
        this.original = itens;
        this.itensBehavior.next(this.items);
        this.resumoBehavior.next(new Resumo(this.items));

        this.servico.obtenhaItensEmAberto(this.original).subscribe(emabertos => {
          this.itemsAberto = emabertos;
        });
      });
    }

    public exibirDetalhes(valor) {
      this.exibirDetalhesGeral = valor;
    }
}
