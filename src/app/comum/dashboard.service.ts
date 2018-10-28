import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ItemArquivo } from '../importa-arquivo/arquivos/itemArquivo';
import { Gerenciador } from '../gerenciadores/gerenciador';
import { ItemAcao } from '../negocio/ItemAcao';
import { ItemDashboard } from '../negocio/ItemDashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private angularFire: AngularFireDatabase) {
  }

  obtenhaDashBoards() {
    return this.angularFire.list<ItemArquivo>('/ItensArquivo').valueChanges()
    .map(itens => new Gerenciador(itens).obtenha());
  }

  obtenhaItensEmAberto(itensoriginal: ItemDashboard[]) {
      const itemsAberto = itensoriginal.filter(itemOriginal => itemOriginal.saida.ObtenhaData() === undefined);

      return this.angularFire.list<ItemAcao>('/CotacoesAtuais').valueChanges()
        .map(valores => {
            itemsAberto.forEach(itemEmAberto => {
                const nomeEmpresa = itemEmAberto.entrada.papeis[0].empresa;
                const itemAcao: ItemAcao =  valores.filter(item => item.codigo === nomeEmpresa)[0];

                if (itemAcao !== undefined) {
                  const valorAtual = itemAcao.valor;
                  itemEmAberto.saida.valor = Number(valorAtual);
                  itemEmAberto.saida.quantidade = itemEmAberto.entrada.quantidade;
                  itemEmAberto.saida.count = 1;
                }
            });

            return itemsAberto;
      });
  }
}
