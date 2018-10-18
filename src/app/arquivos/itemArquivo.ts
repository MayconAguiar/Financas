import { Taxas } from '../negocio/taxas';
import { Tipos } from '../tipos.enum';

export class ItemArquivo {
    codigo: number;
    empresa: string;
    data: Date;
    quantidade: number;
    preco: number;
    natureza: string;
    taxas: Taxas;
    origem: string[];
    tipo: Tipos;


    // public Data(formato: string = 'DD/MM/YYYY') {
    //     return this.data.format(formato);
    // }
    // public MesAno() {
    //     return this.data.format('MMMM/YYYY');
    // }
}
