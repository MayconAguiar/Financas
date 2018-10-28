import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { DashboardService } from '../comum/dashboard.service';
import { ItemDashboard } from '../negocio/ItemDashboard';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-alocacao-de-recursos',
  templateUrl: './alocacao-de-recursos.component.html',
  styleUrls: ['./alocacao-de-recursos.component.scss']
})

export class AlocacaoDeRecursosComponent implements OnInit, AfterViewInit {

  constructor(private servico: DashboardService) { }

  // @ViewChild('header') header: ElementRef;
  // sticky;
  status = true;
  carregadoValores = false;
  itemsAberto: ItemDashboard[];
  // valores: Observable<number[]>;
  // descricoes: Observable<string[]>;
  valores = [];
  descricoes = [];

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.servico.obtenhaDashBoards().subscribe(itens => {
      this.servico.obtenhaItensEmAberto(itens).subscribe(emabertos => {
        this.itemsAberto = emabertos;
        /// const itens3ParaTeste = this.itemsAberto.slice(0, 3);

        emabertos.filter(item => item.saida.valor > 0).forEach(x => {
          this.valores.push(Math.round(x.saida.quantidade * x.saida.valor));
          this.descricoes.push(x.entrada.papeis[0].empresa);
        });

        console.log(this.valores);
        console.log(this.descricoes);

        this.carregadoValores = true;
      });
    });
  }

  flip() {
      this.status = !this.status;
  }

}
