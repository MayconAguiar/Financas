
import { ItemDashboard } from '../negocio/ItemDashboard';
import { ItemArquivo } from '../arquivos/itemArquivo';

export class Gerenciador {
    private compra: ItemArquivo[] = [];
    private venda: ItemArquivo[] = [];
    private resultado: ItemDashboard[] = [];
    private idsAtivos = [];
    private datasPorAtivo = [];
    private formatoData = 'YYYYMMDD';

    constructor(itens: ItemArquivo[] ) {
        this.separeCompraDaVenda(itens);
        this.inicieDados();
    }

    obtenha() {

        const chaves = Object.keys(this.datasPorAtivo).sort((a, b) => a < b ? -1 : 1);

        const that = this;
        chaves.forEach(chave => {

            const empresa = chave;
            let itemdashboard = new ItemDashboard();
            const datas = that.datasPorAtivo[chave].sort((a, b) => a < b ? -1 : 1);

            datas.forEach(data => {
                // debugger;
                const naoExisteSaidaDaAnterior = itemdashboard.entrada !== undefined
                && itemdashboard.entrada.existeValor()
                && !itemdashboard.saida.existeValor();

                if (naoExisteSaidaDaAnterior) {
                    const saidasDoDia = this.venda.filter(x => data === x.Data(this.formatoData) && x.empresa === empresa);
                    itemdashboard.processeSaida(saidasDoDia);
                } else {
                    const itemDashBoard = new ItemDashboard();

                    const entradasDoDia = this.compra.filter(x => data === x.Data(this.formatoData) && x.empresa === empresa);
                    const saidasDoDia = this.venda.filter(x => data === x.Data(this.formatoData) && x.empresa === empresa);

                    itemDashBoard.processe(entradasDoDia, saidasDoDia, itemdashboard);
                    itemdashboard = itemDashBoard;
                    this.resultado.push(itemDashBoard);
                }
            });

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
            const data = element.data.format(this.formatoData);
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
