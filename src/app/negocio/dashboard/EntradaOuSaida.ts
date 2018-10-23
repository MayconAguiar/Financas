import { Papel } from './Papel';
import { Tipos } from '../../tipos.enum';
import { ItemArquivo } from '../../importa-arquivo/arquivos/itemArquivo';

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

    inicie(itensArquivo: ItemArquivo[]) {
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
        return this.valor > 0;
    }

    public ValorMedio() {
        return this.valor ===  0 ? 0 : this.valor / this.count;
    }
}
