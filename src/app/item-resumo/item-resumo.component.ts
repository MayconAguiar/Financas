import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-resumo',
  templateUrl: './item-resumo.component.html',
  styleUrls: ['./item-resumo.component.scss']
})
export class ItemResumoComponent implements OnInit {

  @Input() valor: number;
  @Input() descricao: string;

  constructor() { }

  
  ngOnInit() {
  }

}
