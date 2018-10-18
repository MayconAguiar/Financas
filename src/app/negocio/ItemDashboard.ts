
import { Saldo } from './Saldo';
import { EntradaOuSaida } from './EntradaOuSaida';
import { ItemArquivo } from '../arquivos/itemArquivo';
import { Tipos } from '../tipos.enum';
import { ResumoIndividual } from './ResumoIndividual';


export class ItemDashboard {
    private operacaoAnterior: ItemDashboard;
    public entrada: EntradaOuSaida;
    public saida: EntradaOuSaida;
    public saldo: Saldo;
    public tipo: Tipos;
    public resumo: ResumoIndividual;
    public estaFinalizado = true;


    constructor() {
        this.saldo = new Saldo();
    }

    processe(operacao1: ItemArquivo[], operacao2: ItemArquivo[], operacaoAnterior: ItemDashboard) {
        this.operacaoAnterior = operacaoAnterior;
        this.entrada = new EntradaOuSaida(operacao1);
        this.saida = new EntradaOuSaida(operacao2);

        this.atualizeValores();
    }

    processeSaida(operacao1: ItemArquivo[]) {
        const operacoesAnteriores = this.saida.operacao;
        this.saida = new EntradaOuSaida(operacoesAnteriores.concat(operacao1));
        this.atualizeValores();
    }

    credite(operacao1: ItemArquivo[]) {
        if (operacao1.length > 0) {
            // const operacoesAnteriores = this.entrada.operacao === undefined ? [] : this.entrada.operacao;
            this.entrada = new EntradaOuSaida(operacao1);
            // this.entrada = new EntradaOuSaida(operacoesAnteriores.concat(operacao1));
            this.atualizeValores();
        }
    }

    debite(operacao1: ItemArquivo[]) {
        if (operacao1.length > 0) {
            const operacoesAnteriores = this.saida.operacao;
            this.saida = new EntradaOuSaida(operacoesAnteriores.concat(operacao1));
        }
    }

    valorMedio() {
        return this.saldo.valorMedio > 0 ?  (this.saldo.valorMedio + this.entrada.ValorMedio()) / 2 : this.entrada.ValorMedio();
    }

    private atualizeValores() {
        //const quantidadeEntrada = this.operacaoAnterior.saldo.diferenca + this.entrada.quantidade;

        // vai terminar a operação vendido;
        // garante que as entradas sempre serão maiores
        // if (quantidadeEntrada < this.saida.quantidade) {
        //     this.inverta();
        // }

        // calcular o saldo
        // this.saldo.diferenca = Math.abs(quantidadeEntrada - this.saida.quantidade);
        this.saldo.valorMedio = this.entrada.ValorMedio();

        this.tipo = this.entrada.tipo;
        this.resumo = new ResumoIndividual(this);

        // this.estaFinalizado = this.entrada.existeValor() && this.saida.existeValor()
        // && (this.entrada.quantidade === this.saida.quantidade);
    }

    private inverta() {
        const aux = this.saida;
        this.saida = this.entrada;
        this.entrada = aux;
    }

}
