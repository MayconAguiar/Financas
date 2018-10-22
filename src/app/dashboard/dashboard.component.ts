import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ItemDashboard } from '../negocio/ItemDashboard';
import { GerenciadorDeArquivos } from '../gerenciadores/gerenciadorDeArquivos';
import { Gerenciador } from '../gerenciadores/gerenciador';
import { Resumo } from '../negocio/Resumo';
import { Tipos } from '../tipos.enum';
import {Observable, BehaviorSubject} from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs/Subscriber';
// import { HttpHeaders } from '@angular/common/http/src/headers';

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
    dicionarioDeAcoes= [];
  
    mesSelecionado: 0;
    itensBehavior = new BehaviorSubject<ItemDashboard[]>([]);
    itensAbertoBehavior = new BehaviorSubject<ItemDashboard[]>([]);
    resumoBehavior = new BehaviorSubject<Resumo>(null);
    telaInicialBehavior = new BehaviorSubject<ItemDashboard[]>([]);
  
  
    ngOnInit() {
      this.itemsAsObservable = this.itensBehavior.asObservable();
      this.itemsAbertoAsObservable = this.itensAbertoBehavior.asObservable();
      this.resumo = this.resumoBehavior.asObservable();
      this.dicionarioDeAcoes['BRASIL'] = 'bbas3.sa';
      this.dicionarioDeAcoes['CVC'] = 'cvcb3.sa';
      this.dicionarioDeAcoes['GERDAU'] = 'goau4.sa';
      this.dicionarioDeAcoes['IRBBRASIL'] = 'irbr3.sa';
      this.dicionarioDeAcoes['ITAUSA'] = 'itsa4.sa';
      this.dicionarioDeAcoes['PORTOBELLO'] = 'ptbl3.sa';
      this.dicionarioDeAcoes['RAIADROGASIL'] = 'rdl3.sa';
      this.dicionarioDeAcoes['ULTRAPAR'] = 'ugpa3.sa';
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
  
    public changeListener(files: FileList) {
  
      const operacoes = new GerenciadorDeArquivos(files);
      operacoes.processe().subscribe(x => {
        this.items = new Gerenciador(x).obtenha();
        this.original = this.items;
        this.itemsAberto =  this.original.filter(x => x.saida.data === undefined);
        this.itensBehavior.next(this.items);
        
        
        console.log(this.items);
        this.resumoBehavior.next(new Resumo(this.items));
        // this.atualizeItensAtuais().subscribe(x => {
        //   if(x == this.itemsAberto.length){
        //     this.itensAbertoBehavior.next(this.itemsAberto);
        //   }
        // });
      });

      this.http.get("https://enclout-yahoo-finance.p.mashape.com/show.json?auth_token=&text=AAPL%2C+MSFT%2C+GOOG", 
      {headers:  
        { 'X-Mashape-Key': 'clxG1w5n2CmshJD6wq2FnAcd7rqkp1xcMSZjsnQ5vyte8bsI5T' ,
          'Accept': 'application/json' }
      })
      .subscribe((result: any) => console.log(result.status, result.headers, result.body));
    }

    atualizeItensAtuais() {
      const index = -1;
      return new Observable<any>(observer => this.atualizeItem(index, observer));
    }

    atualizeItem(index, observer: Subscriber<any>) {
      index ++;
      
      if (index == this.itemsAberto.length)  {
        observer.next(index);
        observer.complete();
      }

      const x = this.itemsAberto[index];
      const nomeDaAcao = x == undefined? '' : this.dicionarioDeAcoes[x.entrada.papeis[0].empresa];
        
      if (nomeDaAcao !== undefined) {
          this.obtenhaDados(nomeDaAcao).subscribe(y => {
              // console.log(nomeDaAcao);
              // console.log(y);
              
              if (y['Time Series (Daily)'] !== undefined){

              
              const dados = Object.entries(y['Time Series (Daily)']);
              

              const nomecoluna = '4. close';
              const valorAtual = dados[0][1][nomecoluna];            
              x.saida.valor = Number(valorAtual);
              x.saida.quantidade = x.entrada.quantidade;
              x.saida.count = 1;
            } 
            
            this.atualizeItem(index, observer);
          });
      } else {
        this.atualizeItem(index, observer);
      }
    }

    obtenhaDados(acao): Observable<any> {

      // const headers = new HttpHeaders();
      // headers.append('X-Mashape-Key', 'clxG1w5n2CmshJD6wq2FnAcd7rqkp1xcMSZjsnQ5vyte8bsI5T');
      // headers.append('Accept', 'application/json');

      // const options = new RequestOptions({headers: headers});

      
      
      //.header("Accept", "application/json")
      // .end(function (result) {
      //   console.log(result.status, result.headers, result.body);
      // });
      return this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + acao + '&apikey=HZM6W87XUXUJBPHH');
    }
  }
  