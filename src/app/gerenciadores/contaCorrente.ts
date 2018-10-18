import { ItemArquivo } from '../arquivos/itemArquivo';
import { ItemDashboard } from '../negocio/ItemDashboard';
import { SituacaoSaldo } from '../situacao-saldo.enum';

export class ContaCorrente {

    // Vários itens porque podem ser de dias diferentes;
    saldo: ItemDashboard[];
    itensDashboard: ItemDashboard[] = [];
    // situacaoSaldo: SituacaoSaldo;
    itemAtual: ItemDashboard;

    // constructor(entradas: ItemArquivo[], saidas: ItemArquivo[]) {
    constructor() {
        // estes valores do contrutor é que será a base para identificar se inicia comprado ou vendido;
        // quem começa será quem tem a quantidade maior;
        // let quantidadeEntradas = 0;
        // entradas.forEach(x => quantidadeEntradas += x.quantidade);

        // let quantidadeSaidas = 0;
        // saidas.forEach(x => quantidadeSaidas += x.quantidade);

        // this.situacaoSaldo = quantidadeEntradas > quantidadeSaidas ? SituacaoSaldo.COMPRADO : SituacaoSaldo.VENDIDO;
        // this.inicieNovoItem(entradas, saidas);

    }


    // estes valores de entradas e saidas são somente de um dia
    // teremos que controlar o saldo para gerar novos itemDashboard
    public processe(entradas: ItemArquivo[], saidas: ItemArquivo[]) {

        if (entradas.length === 0 && saidas.length === 0) {
            return this.itensDashboard;
        }

        if (this.itemAtual === undefined) {
            // primeira vez
            this.inicieNovoItem(entradas, saidas);
        } else if (this.obtenhaSituacaoDoSaldo() === SituacaoSaldo.COMPRADO) {
            if (saidas.length > 0) {
                // tenta zerar o saldo
                // mas pode ter mais compra
                this.itemAtual.debite(saidas);
                this.processe(entradas, []);
            } else {
                // mais compra
                this.itemAtual.credite(entradas);
            }
        } else {
            this.inicieNovoItem(entradas, saidas);
        }

        return this.itensDashboard;
    }

    // private zerou(entradas: ItemArquivo[], saidas: ItemArquivo[]) {
    //     // this.itensDashboard.push(this.itemAtual);
    //     this.inicieNovoItem(entradas, saidas);
    // }

    private inicieNovoItem(entradas: ItemArquivo[], saidas: ItemArquivo[]) {
        this.itemAtual = new ItemDashboard();
        this.itemAtual.credite(entradas);
        this.itemAtual.debite(saidas);
        this.itensDashboard.push(this.itemAtual);
    }

    private obtenhaSituacaoDoSaldo() {
        return this.itemAtual.entrada.quantidade > this.itemAtual.saida.quantidade ? SituacaoSaldo.COMPRADO : SituacaoSaldo.ZERADO;
    }
}
