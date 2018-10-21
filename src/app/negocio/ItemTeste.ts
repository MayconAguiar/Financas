
import { Saldo } from './Saldo';
import { EntradaOuSaida } from './EntradaOuSaida';
import { ItemArquivo } from '../arquivos/itemArquivo';
import { Tipos } from '../tipos.enum';
import { ResumoIndividual } from './ResumoIndividual';


export class ItemTeste
{
    private itemTesteAnterior: ItemTeste;
    public entrada = new EntradaOuSaida();
    public saida = new EntradaOuSaida();
    
    constructor() {
        
    }

    credite(operacao1: ItemArquivo) {
        this.entrada.teste(operacao1);
        this.atualizeValores();
    }

    debite(operacao1: ItemArquivo) {
        this.saida.teste(operacao1);
        this.atualizeValores();
    }

    valorMedio() {
        // return this.saldo.valorMedio > 0 ?  (this.saldo.valorMedio + this.entrada.ValorMedio()) / 2 : this.entrada.ValorMedio();
    }

    public atualizeValores() {
        // this.saldo.valorMedio = this.entrada.ValorMedio();

        // this.tipo = this.entrada.tipo;
        // this.resumo = new ResumoIndividual(this);
    }

    private inverta() {
        // const aux = this.saida;
        // this.saida = this.entrada;
        // this.entrada = aux;
    }

}
