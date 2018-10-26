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

import { AngularFireDatabase } from 'angularfire2/database';
import { ItemAcao } from '../../negocio/ItemAcao';
import { ItemArquivo } from '../../importa-arquivo/arquivos/itemArquivo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient, private angularFire: AngularFireDatabase) { }

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
      this.angularFire.list<ItemArquivo>('/ItensArquivo').valueChanges()
      .subscribe(itens => {
        debugger;
        this.items = new Gerenciador(itens).obtenha();

        this.original = this.items;

        this.itemsAberto =  this.original.filter(itemOriginal => itemOriginal.saida.ObtenhaData() === undefined);

        this.itensBehavior.next(this.items);

        this.resumoBehavior.next(new Resumo(this.items));

        this.angularFire.list<ItemAcao>('/CotacoesAtuais').valueChanges()
        .subscribe(valores => {


          this.itemsAberto.forEach(itemEmAberto => {
              const nomeEmpresa = itemEmAberto.entrada.papeis[0].empresa;
              const itemAcao: ItemAcao =  valores.filter(item => item.codigo === nomeEmpresa)[0];

              if (itemAcao !== undefined) {
                const valorAtual = itemAcao.valor;
                itemEmAberto.saida.valor = Number(valorAtual);
                itemEmAberto.saida.quantidade = itemEmAberto.entrada.quantidade;
                itemEmAberto.saida.count = 1;
              }
          });
        });
      });
    }

    public exibirDetalhes(valor) {
      this.exibirDetalhesGeral = valor;
    }

    atualizeItensAtuais() {
      const index = -1;
      return new Observable<any>(observer => this.atualizeItem(index, observer));
    }

    atualizeItem(index, observer: Subscriber<any>) {
      // index ++;

      // if (index === this.itemsAberto.length)  {
      //   observer.next(index);
      //   observer.complete();
      // } else {
      //   const x = this.itemsAberto[index];
      //   const dadosDaAcao = this.dicionarioDeAcoes[x.entrada.papeis[0].empresa];

      //   if (dadosDaAcao !== undefined) {
      //     const valorAtual = dadosDaAcao[1];
      //     x.saida.valor = Number(valorAtual);
      //     x.saida.quantidade = x.entrada.quantidade;
      //     x.saida.count = 1;
      //   }

      //   this.atualizeItem(index, observer);
      // }
    }
}
