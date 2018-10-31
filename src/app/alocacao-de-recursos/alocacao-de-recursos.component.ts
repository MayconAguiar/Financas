import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { DashboardService } from '../comum/dashboard.service';
import { ItemDashboard } from '../negocio/ItemDashboard';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { MatchMediaService } from '../match-media.service';

@Component({
  selector: 'app-alocacao-de-recursos',
  templateUrl: './alocacao-de-recursos.component.html',
  styleUrls: ['./alocacao-de-recursos.component.scss']
})

export class AlocacaoDeRecursosComponent implements OnInit, AfterViewInit {

  constructor(private servico: DashboardService, private matchMediaService: MatchMediaService) { }

  status = true;
  carregadoValores = false;
  observableItemsAberto: Observable<ItemDashboard[]>;
  itemsAbertoBehaviorSubject = new BehaviorSubject<ItemDashboard[]>([]);
  // itensAberto: any = { itens: [], quantidade: 1};
  valores = [];
  descricoes = [];

  ngOnInit() {
    const that = this;
    this.observableItemsAberto = this.itemsAbertoBehaviorSubject.asObservable();
    this.matchMediaService.OnPhone(() => that.mediaPhone());
    this.matchMediaService.IsPhone(() => that.mediaPhone());
    this.matchMediaService.OnTablet(() => that.mediaTablet());
    this.matchMediaService.IsTablet(() => that.mediaTablet());
  }

  mediaPhone() {
    // this.itensAberto.quantidade = 1;
    // this.itemsAbertoBehaviorSubject.next(this.itensAberto);
  }

  mediaTablet() {
    // this.itensAberto.quantidade = 3;
    // this.itemsAbertoBehaviorSubject.next(this.itensAberto);
  }

  ngAfterViewInit() {
    const that = this;
    this.servico.obtenhaDashBoards().subscribe(itens => {
      this.servico.obtenhaItensEmAberto(itens).subscribe(itens2 => {

        // const itens3ParaTeste = this.itemsAberto.slice(0, 3);

        const itensEmAberto = itens2.filter(item => item.saida.valor > 0);
        itensEmAberto.forEach(x => {
          this.valores.push(Math.round(x.saida.quantidade * x.saida.valor));
          this.descricoes.push(x.entrada.papeis[0].empresa);
        });

        that.itemsAbertoBehaviorSubject.next(itensEmAberto);
        that.carregadoValores = true;
      });
    });
  }

  flip() {
      this.status = !this.status;
  }

}
