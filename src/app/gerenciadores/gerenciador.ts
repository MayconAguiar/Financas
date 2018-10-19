
import { ItemDashboard } from '../negocio/ItemDashboard';
import { ItemArquivo } from '../arquivos/itemArquivo';
import { Nova } from './processadores/nova';

export class Gerenciador {
    private compra: ItemArquivo[] = [];
    private venda: ItemArquivo[] = [];
    private resultado: ItemDashboard[] = [];
    private idsAtivos = [];
    private datasPorAtivo = [];

    constructor(itens: ItemArquivo[] ) {
        this.separeCompraDaVenda(itens);
        this.inicieDados();
    }

    obtenha() {
        const chaves = Object.keys(this.datasPorAtivo).sort((a, b) => a < b ? -1 : 1);

        const that = this;
        chaves.forEach(chave => {

            const empresa = chave;
            // let itemdashboard = new ItemDashboard();
            const datas = that.datasPorAtivo[chave].sort((a, b) => a < b ? -1 : 1);
            const compras = this.compra.filter(x => x.empresa === empresa);
            const vendas = this.venda.filter(x => x.empresa === empresa);
            const processador = new Nova();

            processador.entradas = compras;
            processador.saidas = vendas;
            processador.datas = datas;

            processador.execute();

            this.resultado = this.resultado.concat(processador.itensDashboard);
        });

        // console.log(this.resultado);
        return this.resultado;
    }

    private separeCompraDaVenda(itens: ItemArquivo[]) {
        for (let index = 0; index < itens.length; index++) {
            const element = itens[index];
            if (element.natureza === 'V') {
                this.venda.push(element);
            } else {
                this.compra.push(element);
            }
        }
    }

    private inicieDados() {
        const operacoes = this.compra.concat(this.venda);

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
