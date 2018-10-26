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
  itens2: Observable<{}[]>;
  itemNovo: ItemAcao;
  itemUpdate: ItemAcao;
  chaveSelecionada = '';

  ngOnInit() {
    // this.itemsAsObservable = this.itensBehavior.asObservable();
    this.itens2 = this.angularFire.list('/CotacoesAtuais').valueChanges();

    // .valueChanges()
    // .subscribe(x => {
    //   this.itens = x;
    //   this.itensBehavior.next(this.itens);
    //   },
    //   erro => {},
    //   () => console.log(this.itens));
  }

  excluir() {
    this.update(new ItemAcao());
  }

  update(item: ItemAcao) {
    // this.angularFire.list('/CotacoesAtuais').update('key', item);
    let valor = null;
    if (item.valor !== 0) {
      valor = {
        codigo: this.chaveSelecionada,
        valor: item.valor
      };
    }

    this.angularFire.database.ref('CotacoesAtuais/' + this.chaveSelecionada)
    .set(valor);

    this.chaveSelecionada = '';
  }

  adicione() {
    this.itemNovo = new ItemAcao();
    // this.itensBehavior.next(this.itens);
  }

  selecione(item: ItemAcao) {
    this.chaveSelecionada = item.codigo;
    this.itemUpdate = item;
    // this.itemUpdate = new ItemAcao();
    // this.itemUpdate.codigo = item.codigo;
    // this.itemUpdate.valor = item.valor;
    // this.angularFire.list<ItemAcao>('CotacoesAtuais');
  }

  salvar() {
    this.angularFire.database.ref('CotacoesAtuais/' + this.itemNovo.codigo)
    .set({
      codigo: this.itemNovo.codigo,
      valor: this.itemNovo.valor
    });
    // this.itens.push(this.itemNovo);
    // this.angularFire.list<ItemAcao>('CotacoesAtuais').push(this.itemNovo);
    // this.itensBehavior.next(this.itens);
    this.itemNovo = null;
  }
}
