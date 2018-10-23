import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resumo } from '../../negocio/Resumo';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss']
})
export class ResumoComponent implements OnInit {

  @Input() resumo: Observable<Resumo>;

  constructor() { }

  ngOnInit() {
  }

}
