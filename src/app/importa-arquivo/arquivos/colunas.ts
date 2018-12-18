import { Tipos } from '../../tipos.enum';

export class Colunas {
    natureza = 1;
    quantidade;
    quantidadeArray;
    preço;

    constructor(quantidadeArray: number) {

        const ultimoElemento = quantidadeArray - 1;
        this.quantidadeArray = quantidadeArray;
        this.quantidade = ultimoElemento - 3;
        this.preço = ultimoElemento - 2;

        // no arquivo pdf hora vem o prazo hora não. quando não vem o prazo a empresa estará na posição 3
        // do contrário estrará na posição 4
        // if (this.quantidadeArray < 10) {
        //     this.empresa = 3;
        // }
    }

    obtenhaNomeDaEmpresa(arrayElement) {
        /// let nome = arrayElement[3].split(' ')[0];
        let nome = this.retireEspacos(arrayElement[3]);

        if (nome.length < 6) {
            nome = this.retireEspacos(arrayElement[4]);
            // nome = arrayElement[4].split(' ')[0];
        }

        return nome.trim();
    }

    retireEspacos(nome: string) {
        while (nome.indexOf('  ') > -1) {
            nome = nome.replace('  ', ' ');
        }

        return nome;
    }
}
