import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Chart from 'chart.js';
import { AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import {Observable, BehaviorSubject, Subscription} from 'rxjs/Rx';
import { Resumo } from '../negocio/Resumo';

@Component({
  selector: 'app-grafico-evolucao-patrimonial',
  templateUrl: './grafico-evolucao-patrimonial.component.html',
  styleUrls: ['./grafico-evolucao-patrimonial.component.scss']
})
export class GraficoEvolucaoPatrimonialComponent implements OnInit, AfterViewInit, OnDestroy {
  canvas: any;
  ctx: any;
  @ViewChild('myChart') el: ElementRef;

  // @Input() height = 400;

  @Input() conteudo: Observable<any>;


  private valorTotal = 0;
  subcribe: Subscription;
  descricoes = [];
  valores = [];
  resumos: Resumo[] = [];
  myChart: Chart;
  colors = [];

  constructor() {
    this.inicieCores();
  }

  ngOnInit() {

    this.ctx = this.el.nativeElement.getContext('2d');
      this.valorTotal = this.valores.reduce((a, b) => a + b, 0);
      const that = this;
      this.myChart = new Chart(this.ctx, {
        type: 'bar',
        data: {
            labels: this.descricoes,
            datasets: [{
                label: 'Evolução mensal:',
                data: this.valores,
                backgroundColor: this.obtenhaCores(this.valores.length),
                borderWidth: 1
            },
          ]
        },
        options: {
          responsive: false,
          title: {
            display: true,
            text: 'Evolução patrimonial anual'
        },
        tooltips: {
          callbacks: {
              label: function(tooltipItem: any, data: any) {
                  let label = data.datasets[tooltipItem.datasetIndex].label || '';

                  if (label) {
                      label += 'Valor Aplicado:';
                  }

                  label = Math.floor((data.datasets[0].data[tooltipItem.index] / that.valorTotal) * 10000) / 100;

                  label += '%';

                  const resumo = that.resumos[tooltipItem.index];
                  console.log(resumo);

                  label += ' \n Entrada R$:' + Math.round(resumo.totalEntrada * 100) / 100;
                  label += ' \n Lucro/Prejuízo [R$:' + Math.round(resumo.lucroLiquido * 100) / 100;
                  label += ' \n %:' + Math.floor((resumo.lucroLiquido / resumo.totalEntrada) * 10000) / 100;
                  label += ']';

                  return label;
              }
          }
      }
        }
      });

    this.subcribe =  this.conteudo.subscribe(conteudo => {
      this.descricoes = conteudo[0];
      this.valores = conteudo[1];
      this.resumos = conteudo[2];
      this.valorTotal = this.valores.reduce((a, b) => a + b, 0);
      this.myChart.data.labels = this.descricoes;
      this.myChart.data.datasets = [{
        label: 'Evolução mensal:',
        data: this.valores,
        backgroundColor: this.obtenhaCores(this.valores.length),
        borderWidth: 1
      }];
      this.myChart.update();
    });
  }

  ngOnDestroy() {
    this.subcribe.unsubscribe();
  }
  ngAfterViewInit() {
  }



  inicieCores() {
      const dynamicColors = function() {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return 'rgba(' + r + ',' + g + ',' + b + ')';
    };
    for (let index = 0; index < 12; index++) {
      this.colors.push(dynamicColors());
    }
  }

  obtenhaCores(quantidade) {
    return this.colors.slice(0, quantidade - 1);
  }
}
