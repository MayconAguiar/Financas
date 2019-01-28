
import { ItemDashboard } from '../negocio/ItemDashboard';
import { ItemArquivo } from '../importa-arquivo/arquivos/itemArquivo';
import { Tipos } from '../tipos.enum';


export class Gerenciador {
    private entrada: ItemArquivo[] = [];
    private saida: ItemArquivo[] = [];
    private resultado: ItemDashboard[] = [];
    private idsAtivos = [];
    private datasPorAtivo = [];
    private itens: ItemArquivo[];

    constructor(listaDoBanco: any[] ) {

        const lista  = [];
        listaDoBanco.forEach(listaPorMes =>  {
            Object.keys(listaPorMes).forEach(mes => {
                listaPorMes[mes].forEach(element => {
                    lista.push(element);
                });
            });
        });
        this.separeCompraDaVenda(lista);
        this.itens = lista;
        this.inicieDados();
    }

    obtenha() {
        const chaves = Object.keys(this.datasPorAtivo).sort((a, b) => a < b ? -1 : 1);

        const that = this;
        chaves.forEach(chave => {

            // if (chave !== 'BRADESCO') {
            //   return;
            // }
            const empresa = chave;

            // let itemdashboard = new ItemDashboard();
            const datas = that.datasPorAtivo[chave].sort((a, b) => a < b ? -1 : 1);
            let itemAnterior;

            datas.forEach(element => {

                const itensEntrada = that.entrada.filter(x => x.data === element
                    && x.empresa === empresa);

                const entradas  = this.Obtenha(itensEntrada);

                const itensSaida = that.saida.filter(x => x.data === element
                    && x.empresa === empresa);

                const saidas = this.Obtenha(itensSaida);

                const itemdashboard = new ItemDashboard();

                itemdashboard.operacaoAnterior = itemAnterior;
                itemdashboard.crediteTeste(entradas);
                itemdashboard.debiteTeste(saidas);

                itemAnterior = itemdashboard;
                this.resultado.push(itemdashboard);
            });
        });

        // console.log(this.resultado);
        // return this.resultado.filter(x => x.entrada.quantidade > 0 && x.saida.quantidade > 0);

        const opcoes = this.resultado.filter(x => x.tipo === Tipos.OPCOES && x.saida.count === 0);

        opcoes.forEach(opcao => {
            const saida = new ItemArquivo();
            saida.data = opcao.entrada.data;
            saida.quantidade = opcao.entrada.quantidade;
            saida.preco = 0;

            opcao.debite([saida]);
        });

        return this.resultado.filter(x => x.entrada.quantidade > 0);
    }

    private Obtenha(lista: ItemArquivo[]) {
        const arquivo = new ItemArquivo();

        lista.forEach(x => {
            arquivo.empresa = x.empresa;
            arquivo.data = x.data;
            arquivo.quantidade += x.quantidade;
            arquivo.valorTotal += x.quantidade * x.preco;
            // valor médio
            arquivo.preco = arquivo.valorTotal / arquivo.quantidade;
            arquivo.natureza = x.natureza;
            arquivo.tipo = x.tipo;
            arquivo.count += 1;
        });

        if (arquivo.count > 1) {
        //     // arquivo.preco = arquivo.preco / arquivo.count;
        //     arquivo.preco = arquivo.valorTotal / arquivo.quantidade;
             arquivo.count = 1;
        }

        return arquivo;
    }

    private separeCompraDaVenda(itens: ItemArquivo[]) {
         for (let index = 0; index < itens.length; index++) {
            const element = itens[index];
            if (element.natureza === 'V') {
                this.saida.push(element);
            } else {
                this.entrada.push(element);
            }
        }
    }

    private inicieDados() {
        const operacoes = this.entrada.concat(this.saida);

        operacoes.forEach(element => {
            const data = element.data;
            if (this.idsAtivos.indexOf(element.empresa) === -1) {
                this.idsAtivos.push(element.empresa);
                this.datasPorAtivo[element.empresa] = [];
                this.datasPorAtivo[element.empresa].push(data);
            } else if (this.datasPorAtivo[element.empresa].indexOf(data) === -1)  {
                this.datasPorAtivo[element.empresa].push(data);
            }
        });
    }
}
