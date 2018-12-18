import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ItemDashboard } from '../../negocio/ItemDashboard';
import { Resumo } from '../../negocio/Resumo';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DashboardService } from '../../comum/dashboard.service';

@Component({
  selector: 'app-operacoes-abertas',
  templateUrl: './operacoes-abertas.component.html',
  styleUrls: ['./operacoes-abertas.component.scss']
})
export class OperacoesAbertasComponent implements OnInit {

  constructor(private servico: DashboardService) {
    // this.mesSelecionado = this.obtenhaMesAtual();
  }

  itemsAsObservable: Observable<ItemDashboard[]>;
  resumo: Observable<Resumo>;
  items: ItemDashboard[];
  original: ItemDashboard[] = [];
  exibirDetalhesGeral = false;

  mesSelecionado: number;
  itensBehavior = new BehaviorSubject<ItemDashboard[]>([]);
  itensAbertoBehavior = new BehaviorSubject<ItemDashboard[]>([]);
  resumoBehavior = new BehaviorSubject<Resumo>(null);
  telaInicialBehavior = new BehaviorSubject<ItemDashboard[]>([]);

  ngOnInit() {
    this.itemsAsObservable = this.itensBehavior.asObservable();
    this.resumo = this.resumoBehavior.asObservable();
    this.Inicie();
  }

  private Inicie() {
    this.servico.obtenhaDashBoards().subscribe(itens => {
      this.original = itens;
      this.servico.obtenhaItensEmAberto(this.original).subscribe(emabertos => {
        this.resumoBehavior.next(new Resumo(emabertos));
        this.itensBehavior.next(emabertos);
      });
    });
  }

}
