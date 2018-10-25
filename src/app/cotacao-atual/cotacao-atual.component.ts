import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ItemAcao } from '../negocio/ItemAcao';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from '@angular/fire/database/interfaces';


@Component({
  selector: 'app-cotacao-atual',
  templateUrl: './cotacao-atual.component.html',
  styleUrls: ['./cotacao-atual.component.scss']
})
export class CotacaoAtualComponent implements OnInit {

  constructor(private angularFire: AngularFireDatabase) { }

  itemsAsObservable: Observable<ItemAcao[]>;
  itensBehavior = new BehaviorSubject<ItemAcao[]>([]);
  itens: ItemAcao[] = [];
  itemNovo: ItemAcao;

  ngOnInit() {
    this.itemsAsObservable = this.itensBehavior.asObservable();
    this.angularFire.list<ItemAcao>('CotacoesAtuais').valueChanges()
    .subscribe(x => {
      this.itens = x;
      this.itensBehavior.next(this.itens);
      },
      erro => {},
      () => console.log(this.itens));
  }

  adicione() {
    this.itemNovo = new ItemAcao();
    // this.itensBehavior.next(this.itens);
  }

  salvar() {
    this.itens.push(this.itemNovo);
    this.angularFire.list<ItemAcao>('CotacoesAtuais').push(this.itemNovo);
    this.itensBehavior.next(this.itens);
    this.itemNovo = null;
  }
}
