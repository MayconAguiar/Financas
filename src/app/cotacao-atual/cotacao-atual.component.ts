import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ItemAcao } from '../negocio/ItemAcao';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cotacao-atual',
  templateUrl: './cotacao-atual.component.html',
  styleUrls: ['./cotacao-atual.component.scss']
})
export class CotacaoAtualComponent implements OnInit {

  constructor() { }
  
  itemsAsObservable: Observable<ItemAcao[]>;
  itensBehavior = new BehaviorSubject<ItemAcao[]>([]);
  itens: ItemAcao[] = [];

  ngOnInit() {
    this.itemsAsObservable = this.itensBehavior.asObservable();
  }

  form_submit(f: NgForm) {
    console.log(f.form.controls);
    console.log('valor do controle nome: ' + f.form.controls.nome.value);
  }

  adicione() {
    this.itens.push(new ItemAcao());
    this.itensBehavior.next(this.itens);
  }
}
