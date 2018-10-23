import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ItemDashboard } from '../../negocio/dashboard/ItemDashboard';
import { GerenciadorDeArquivos } from '../../gerenciadores/gerenciadorDeArquivos';
import { Gerenciador } from '../../gerenciadores/gerenciador';
import { Resumo } from '../../negocio/dashboard/Resumo';
import { Tipos } from '../../tipos.enum';
import {Observable, BehaviorSubject} from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs/Subscriber';
import { TipoDashboard } from '../../tipo-dashboard.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient) { }

    itemsAsObservable: Observable<ItemDashboard[]>;
    itemsAbertoAsObservable: Observable<ItemDashboard[]>;
    resumo: Observable<Resumo>;
    items: ItemDashboard[];
    itemsAberto: ItemDashboard[];
    original: ItemDashboard[] = [];
    dicionarioDeAcoes = [];
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
      this.dicionarioDeAcoes['BRASIL'] = ['bbas3.sa', '39.85'];
      this.dicionarioDeAcoes['CVC'] = ['cvcb3.sa', '55'];
      this.dicionarioDeAcoes['GERDAU'] = ['goau4.sa', '7.71'];
      this.dicionarioDeAcoes['IRBBRASIL'] = ['irbr3.sa', '68.71'];
      this.dicionarioDeAcoes['ITAUSA'] = ['itsa4.sa', '10.98'];
      this.dicionarioDeAcoes['PORTOBELLO'] = ['ptbl3.sa', '4.85'];
      this.dicionarioDeAcoes['RAIADROGASIL'] = ['radl3.sa', '66.80'];
      this.dicionarioDeAcoes['ULTRAPAR'] = ['ugpa3.sa', '39.79'];
    }

    public mudouFiltro(mes) {
      this.mesSelecionado = mes;
      this.items =  this.original.filter(x => x.saida.data !== undefined && x.saida.data.getMonth() === Number(mes));
      console.log(this.items);
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

    public changeListener(files: FileList) {

      const operacoes = new GerenciadorDeArquivos(files);
      operacoes.processe().subscribe(x => {

        this.items = new Gerenciador(x).obtenha();

        this.original = this.items;

        this.itemsAberto =  this.original.filter(itemOriginal => itemOriginal.saida.data === undefined);

        this.itensBehavior.next(this.items);

        this.resumoBehavior.next(new Resumo(this.items));

        this.atualizeItensAtuais().subscribe(itensAtuais => {

          if (itensAtuais === this.itemsAberto.length) {
             this.itensAbertoBehavior.next(this.itemsAberto);
           }

        });

      });
    }

    public exibirDetalhes(valor) {
      console.log(valor);
      this.exibirDetalhesGeral = valor;
    }

    atualizeItensAtuais() {
      const index = -1;
      return new Observable<any>(observer => this.atualizeItem(index, observer));
    }

    atualizeItem(index, observer: Subscriber<any>) {
      index ++;

      if (index === this.itemsAberto.length)  {
        observer.next(index);
        observer.complete();
      } else {
        const x = this.itemsAberto[index];
        const dadosDaAcao = this.dicionarioDeAcoes[x.entrada.papeis[0].empresa];

        if (dadosDaAcao !== undefined) {
          const valorAtual = dadosDaAcao[1];
          x.saida.valor = Number(valorAtual);
          x.saida.quantidade = x.entrada.quantidade;
          x.saida.count = 1;
        }

        this.atualizeItem(index, observer);
      }
    }
}
