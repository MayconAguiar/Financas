import { Papel } from './Papel';
import { ItemArquivo } from '../arquivos/itemArquivo';
import { Tipos } from '../tipos.enum';

export class EntradaOuSaida {

    public papeis: Papel[] = [];
    public itemArquivo: ItemArquivo[] = [];
    public data: Date;
    public tipo: Tipos;
    public count = 0;
    public valor = 0;

    quantidade = 0;

    constructor() {
        
    }

    concat(itensArquivo: ItemArquivo[]) {
        itensArquivo.forEach(x => {
            const papel = new Papel();
            papel.natureza = x.natureza;
            papel.empresa = x.empresa;
            this.data = x.data;
            this.papeis.push(papel);
            this.quantidade += x.quantidade;
            this.count ++;
            this.valor += x.preco;
            this.tipo = x.tipo;
        });

        this.itemArquivo = this.itemArquivo.concat(itensArquivo);
    }

    inicie(itensArquivo: ItemArquivo[]){
        itensArquivo.forEach(x => {
            const papel = new Papel();
            papel.natureza = x.natureza;
            papel.empresa = x.empresa;
            this.data = x.data;
            this.papeis.push(papel);
            this.quantidade += x.quantidade;
            this.count ++;
            this.valor += x.preco;
            this.tipo = x.tipo;
        });

        this.itemArquivo = itensArquivo;
    }

    teste (x: ItemArquivo) {
        const papel = new Papel();
        papel.natureza = x.natureza;
        papel.empresa = x.empresa;
        this.data = x.data;
        this.papeis.push(papel);
        this.quantidade = x.quantidade;
        this.count = x.count;
        this.valor = x.preco;
        this.tipo = x.tipo;
        this.itemArquivo.push(x);
    }

    public existeValor() {
        return this.itemArquivo.length > 0;
    }

    public ValorMedio() {
        return this.valor ===  0 ? 0 : this.valor / this.count;
    }

    // public Split(count: number) {
    //     const novasOperacoes = this.operacao.slice(0, count);
    //     // deleta os elementos das novas operacoes
    //     this.operacao = this.operacao.splice(0, count);
    //     this.inicie(this.operacao);

    //     const entradaOuSaida = new EntradaOuSaida();
    //     entradaOuSaida.inicie(novasOperacoes);
        
    //     return entradaOuSaida;
    // }
}
