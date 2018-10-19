import { ItemArquivo } from '../../arquivos/itemArquivo';
import { ItemDashboard } from '../../negocio/ItemDashboard';

export class Processador {

    private item: Processador;
    private iDataAtual = -1;

    public entradas: ItemArquivo[];
    public saidas: ItemArquivo[];
    public datas: Date[];
    public itensDashboard: ItemDashboard[] = [];

    protected itemAtual: ItemDashboard;
    protected entradasNoDia: ItemArquivo[];
    protected saidasNoDia: ItemArquivo[];

    constructor() {
    }

    public definaProximo(item: Processador) {
        this.item = item;
        this.item.entradas = this.entradas;
        this.item.saidas = this.saidas;
        this.item.itensDashboard = this.itensDashboard;
        this.item.itemAtual = this.itemAtual;
        this.item.iDataAtual = this.iDataAtual;
        this.item.entradasNoDia = this.entradasNoDia;
        this.item.saidasNoDia = this.entradasNoDia;
        this.item.datas = this.datas;
    }

    public execute() {
        if (this.item != null) {
             this.item.execute();
        }
    }

    public movaProximaData() {
        if (this.iDataAtual < this.datas.length - 1) {
            this.iDataAtual += 1;
            const data = this.datas[this.iDataAtual];
            this.entradasNoDia = this.entradas.filter(x => x.data === data).sort((a, b) => a < b ? -1 : 1);
            this.saidasNoDia = this.saidas.filter(x => x.data === data).sort((a, b) => a < b ? -1 : 1);
            return true;
        }

        return false;
    }

    protected obtenhaQuantidadeEntradas() {
        let quantidade = 0;
        this.entradasNoDia.forEach(x => quantidade += x.quantidade);
        return quantidade;
    }

    protected obtenhaTodosDiferenteDaEntrada() {
        return this.naturezaEhDeCompra() ? this.saidasNoDia : this.entradasNoDia;
    }

    protected obtenhaTodosDoMesmoTipoDaEntrada() {
        return this.naturezaEhDeCompra() ? this.entradasNoDia : this.saidas;
    }

    protected obtenhaQuantidadeSaidas() {
        let quantidade = 0;
        this.saidasNoDia.forEach(x => quantidade += x.quantidade);
        return quantidade;
    }

    private naturezaEhDeCompra() {
        return this.entradas[0].natureza === 'C';
    }
}
