import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit, AfterViewInit {
  canvas: any;
  ctx: any;
  @ViewChild('myChart') el: ElementRef;

  // @Input() height = 400;
  @Input() descricoes: string[] = [];
  @Input() valores: number[] = [];

  private valorTotal = 0;

  constructor() { }

  data: any;

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.ctx = this.el.nativeElement.getContext('2d');
    this.valorTotal = this.valores.reduce((a, b) => a + b, 0);
    const that = this;
    const myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: this.descricoes,
          datasets: [{
              label: 'Percentual aplicado:',
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
          text: 'Alocação/Distribuição dos Recursos'
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
                return label;
            }
        }
    }
      }
    });
  }

  obtenhaCores(quantidade) {
    const colors = [];
    const dynamicColors = function() {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return 'rgba(' + r + ',' + g + ',' + b + ')';
    };
    for (let index = 0; index < quantidade; index++) {
      colors.push(dynamicColors());
    }

    return colors;
  }

}
