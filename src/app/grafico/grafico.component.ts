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
  @Input() height: 400;

  constructor() { }

  data: any;

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.el);
    this.ctx = this.el.nativeElement.getContext('2d');
    const myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: ['New', 'In Progress', 'On Hold'],
          datasets: [{
              label: '# of Votes',
              data: [1, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          },
        ]
      },
      options: {
        responsive: false
      }
    });
  }

}
