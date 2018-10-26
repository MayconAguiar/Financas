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
      console.log(itemArquivo);
      itemArquivo.forEach(x => {
        this.angularFire.list('/ItensArquivo').push(x);
      });
    });

  }

}
