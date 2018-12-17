import { Component, OnInit } from '@angular/core';
import { GerenciadorDeArquivos } from '../../gerenciadores/gerenciadorDeArquivos';
import { Gerenciador } from '../../gerenciadores/gerenciador';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-importa',
  templateUrl: './importa.component.html',
  styleUrls: ['./importa.component.scss']
})
export class ImportaComponent implements OnInit {

  constructor(private angularFire: AngularFireDatabase) { }

  ngOnInit() {
  }

  public changeListener(files: FileList) {

    const operacoes = new GerenciadorDeArquivos(files);

    operacoes.processe().subscribe(itemArquivo => {
      // const items = new Gerenciador(x).obtenha();
      // itemArquivo.
      const grupos = this.groupBy(itemArquivo, x => x.obtenhaMesAno());

      this.angularFire.list('/ItensArquivo').push(grupos);

      grupos.forEach((lista, mes) => {
       this.angularFire.object(`ItensArquivo/${mes}`).set(lista);
      });
      // this.angularFire.list('/ItensArquivo').push(x);
      // itemArquivo.forEach(x => {

      //   const data = itemArquivo[0].data.substring(4, 6) + '/' + itemArquivo[0].data.substring(0, 4);
      //   this.angularFire.list('/ItensArquivo').push(x);
      // });
    });

  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
  }

}
