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

  @Input() height = 400;
  @Input() descricoes: string[] = [];
  @Input() valores: number[] = [];

  @Input() ObservableDescricoes: string[] = [];
  @Input() ObservableValores: number[] = [];

  constructor() { }

  data: any;

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.ctx = this.el.nativeElement.getContext('2d');

    const myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: this.descricoes,
          datasets: [{
              label: '# of Votes',
              data: this.valores,
              backgroundColor: this.obtenhaCores(this.valores.length),
              // backgroundColor: [
              //     'rgba(255, 99, 132, 1)',
              //     'rgba(54, 162, 235, 1)',
              //     'rgba(255, 206, 86, 1)'
              // ],
              borderWidth: 1
          },
        ]
      },
      options: {
        responsive: false
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
