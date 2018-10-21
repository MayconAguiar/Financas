
import { Saldo } from './Saldo';
import { EntradaOuSaida } from './EntradaOuSaida';
import { ItemArquivo } from '../arquivos/itemArquivo';
import { Tipos } from '../tipos.enum';
import { ResumoIndividual } from './ResumoIndividual';


export class ItemDashboard {
    public operacaoAnterior: ItemDashboard;
    public entrada = new EntradaOuSaida();
    public saida = new EntradaOuSaida();
    public saldo: Saldo;
    public tipo: Tipos;
    public resumo: ResumoIndividual;
    public estaFinalizado = true;


    constructor() {
        this.saldo = new Saldo();
    }

    credite(operacao1: ItemArquivo[]) {
        if (operacao1.length > 0) {
            this.entrada.concat(operacao1);
            this.atualizeValores();
        }
    }

    debite(operacao1: ItemArquivo[]) {
        if (operacao1.length > 0) {
            this.saida.concat(operacao1);
            this.atualizeValores();
        }
    }

    crediteTeste(operacao1: ItemArquivo) {
        const diferenca = this.obtenhaDiferencaDaEntrada();
        
        if (diferenca.quantidade > 0){
            diferenca.concat(operacao1);
            this.entrada.teste(diferenca);
        } else {
            this.entrada.teste(operacao1);
        }

        this.atualizeValores();
    }

    debiteTeste(operacao1: ItemArquivo) {
        this.saida.teste(operacao1);
        this.atualizeValores();
    }

    obtenhaDiferencaDaEntrada() {
        let operacao = new ItemArquivo();
        
        if (this.operacaoAnterior !== undefined) {
            
            if (this.operacaoAnterior.entrada.quantidade != this.operacaoAnterior.saida.quantidade) {
                operacao = this.operacaoAnterior.entrada.itemArquivo[0].obtenhaNovo();
                
                const diferenca = this.operacaoAnterior.entrada.quantidade - this.operacaoAnterior.saida.quantidade;
                //operacao.data = this.operacaoAnterior.entrada.data;
                operacao.quantidade = diferenca;
                //operacao.empresa = this.operacaoAnterior.entrada.
                operacao.preco = this.operacaoAnterior.entrada.valor;
                this.operacaoAnterior.entrada.quantidade -= diferenca;
                this.operacaoAnterior.resumo = new ResumoIndividual(this.operacaoAnterior);
            }
        }

        return operacao;
    }

    valorMedio() {
        return this.saldo.valorMedio > 0 ?  (this.saldo.valorMedio + this.entrada.ValorMedio()) / 2 : this.entrada.ValorMedio();
    }

    public atualizeValores() {
        this.saldo.valorMedio = this.entrada.ValorMedio();

        this.tipo = this.entrada.tipo;
        this.resumo = new ResumoIndividual(this);
    }

    private inverta() {
        const aux = this.saida;
        this.saida = this.entrada;
        this.entrada = aux;
    }

}
