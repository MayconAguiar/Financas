import { Tipos } from '../../tipos.enum';

export class ItemArquivo {
    codigo = 0;
    empresa = '';
    data: string;
    quantidade = 0;
    preco = 0;
    natureza = '';
    // taxas: Taxas;
    tipo: Tipos;
    count = 0;
    origem;
    valorTotal = 0;

    public obtenhaNovo() {
        const item = new  ItemArquivo();
        item.codigo = this.codigo;
        item.empresa = this.empresa;
        item.data = this.data;
        item.quantidade = this.quantidade;
        item.preco = this.preco;
        item.natureza = this.natureza;
        item.tipo = this.tipo;
        item.count = this.count;
        item.origem = this.origem;

        return item;
    }
    public concat(item: ItemArquivo) {
        if (item.quantidade > 0) {
            this.quantidade += item.quantidade;
            this.preco += item.preco;
            this.preco = this.preco / 2;
            this.count = 1;
        }
    }

    public obtenhaMesAno() {
        if (this.data !== undefined) {
            return this.data.substring(0, 4) + '/' + this.data.substring(4, 6);
        }
    }
}
