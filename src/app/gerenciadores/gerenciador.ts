
import { ItemDashboard } from '../negocio/ItemDashboard';
import { ItemArquivo } from '../arquivos/itemArquivo';
import { ItemTeste } from '../negocio/ItemTeste';

export class Gerenciador {
    private entrada: ItemArquivo[] = [];
    private saida: ItemArquivo[] = [];
    private resultado: ItemDashboard[] = [];
    private idsAtivos = [];
    private datasPorAtivo = [];
    private itens: ItemArquivo[];

    constructor(itens: ItemArquivo[] ) {
        this.separeCompraDaVenda(itens);
        this.itens = itens;
        this.inicieDados();
    }

    obtenha() {
        const chaves = Object.keys(this.datasPorAtivo).sort((a, b) => a < b ? -1 : 1);

        const that = this;
        chaves.forEach(chave => {
            
            const empresa = chave;

            // let itemdashboard = new ItemDashboard();
            const datas = that.datasPorAtivo[chave].sort((a, b) => a < b ? -1 : 1);
            let itemAnterior;
            
            datas.forEach(element => {

                const itensEntrada = that.entrada.filter(x => x.data.toISOString() === element 
                    && x.empresa == empresa);
                
                const entradas  = this.Obtenha(itensEntrada);
                
                const itensSaida = that.saida.filter(x => x.data.toISOString() === element 
                    && x.empresa == empresa);
                
                const saidas = this.Obtenha(itensSaida);

                let itemdashboard = new ItemDashboard();

                itemdashboard.operacaoAnterior = itemAnterior;                
                itemdashboard.crediteTeste(entradas);
                itemdashboard.debiteTeste(saidas);

                itemAnterior = itemdashboard;
                this.resultado.push(itemdashboard);
            });
        });

        // console.log(this.resultado);
        // return this.resultado.filter(x => x.entrada.quantidade > 0 && x.saida.quantidade > 0);
        return this.resultado.filter(x => x.entrada.quantidade > 0);
    }

    private Obtenha(lista: ItemArquivo[]) {
        const arquivo = new ItemArquivo();

        lista.forEach(x => {
            //arquivo.codigo = x.codigo
            arquivo.empresa = x.empresa;
            arquivo.data = x.data;
            arquivo.quantidade += x.quantidade;
            arquivo.preco += x.preco;
            arquivo.natureza = x.natureza;
            arquivo.tipo = x.tipo;
            arquivo.count +=1;
        })
        
        if (arquivo.count > 1){
            arquivo.preco = arquivo.preco / arquivo.count;
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
                this.datasPorAtivo[element.empresa].push(data.toISOString());
            } else if (this.datasPorAtivo[element.empresa].indexOf(data.toISOString()) === -1)  {
                this.datasPorAtivo[element.empresa].push(data.toISOString());
            }
        });
    }
}
