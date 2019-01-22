export class Colunas {
    valorInicial = 0;
    natureza;
    quantidade;
    quantidadeArray;
    preço;
    nomeDaEmpresa;
    private array;

    constructor(arrayElement: any[], descricoes: any []) {

        // if (arrayElement.length < descricoes.length) {
        //     arrayElement = [''].concat(arrayElement);
        // }

        // if (arrayElement.length < descricoes.length) {
        //     throw  new Error('Padrão de Arquivo Inválido!');
        // }

        this.array = arrayElement;
        this.quantidadeArray = arrayElement.length;
        const ultimoElemento = this.quantidadeArray - 1;
        this.quantidade = ultimoElemento - 3;
        this.preço = ultimoElemento - 2;
        this.natureza = 1;
        this.nomeDaEmpresa = 3;

        // his.natureza = this.valorInicial + 1;
        // const ultimoElemento = quantidadeArray - 1;
        // this.quantidadeArray = quantidadeArray;
        // this.quantidade = ultimoElemento - 3;
        // this.preço = ultimoElemento - 2;

        // no arquivo pdf hora vem o prazo hora não. quando não vem o prazo a empresa estará na posição 3
        // do contrário estrará na posição 4
        // if (this.quantidadeArray < 10) {
        //     this.empresa = 3;
        // }




    }

    // private buildColunas(arrayElement) {
    //     const tipo = this.obtenhaTipo(arrayElement);
    //     this.quantidadeArray = arrayElement.length;
    //     const ultimoElemento = this.quantidadeArray - 1;
    //     this.quantidade = ultimoElemento - 3;
    //     this.preço = ultimoElemento - 2;

    //     switch (tipo) {
    //         case PadraoArquivo.TIPO1:
    //             this.natureza = 2;
    //             this.nomeDaEmpresa = 4;
    //             break;
    //         case PadraoArquivo.TIPO2:
    //             this.natureza = 1;
    //             this.nomeDaEmpresa = 3;
    //             break;
    //         case PadraoArquivo.TIPO3:
    //             this.natureza = 1;
    //             this.nomeDaEmpresa = 3;
    //             break;
    //         case PadraoArquivo.TIPO4:
    //              this.natureza = 1;
    //              this.nomeDaEmpresa = 3;
    //              break;
    //         case PadraoArquivo.TIPO5:
    //             this.natureza = 2;
    //             this.nomeDaEmpresa = 4;
    //             break;
    //         case PadraoArquivo.TIPO6:
    //             this.natureza = 1;
    //             this.nomeDaEmpresa = 4;
    //             break;
    //         case PadraoArquivo.TIPO7:
    //             this.natureza = 1;
    //             this.nomeDaEmpresa = 4;
    //             break;
    //         case PadraoArquivo.TIPO8:
    //             this.natureza = 1;
    //             this.nomeDaEmpresa = 4;
    //             break;
    //     }
    // }

    // private obtenhaTipo(arrayElement): PadraoArquivo {
    //     if (arrayElement.length === 8 && arrayElement[0] === '1-BOVESPA') {
    //         return PadraoArquivo.TIPO1;
    //     } else if (arrayElement.length === 9 && arrayElement[1] === '1-BOVESPA') {
    //         return PadraoArquivo.TIPO2;
    //     } else if (arrayElement.length === 9 && arrayElement[0] === '1-BOVESPA') {
    //         return PadraoArquivo.TIPO3;
    //     } else if (arrayElement.length === 10 && arrayElement[0] === '1-BOVESPA'
    //                 &&  (arrayElement[1] === 'V' || arrayElement[1] === 'C')) {
    //         return PadraoArquivo.TIPO8;
    //     } else if (arrayElement.length === 10 && arrayElement[0] === '1-BOVESPA') {
    //          return PadraoArquivo.TIPO4;
    //     } else if (arrayElement.length === 10 && arrayElement[1] === '1-BOVESPA') {
    //         return PadraoArquivo.TIPO5;
    //     } else if (arrayElement.length === 11 && arrayElement[0] === '1-BOVESPA') {
    //         return PadraoArquivo.TIPO6;
    //     } else if (arrayElement.length === 12 && arrayElement[0] === '1-BOVESPA') {
    //         return PadraoArquivo.TIPO7;
    //     } else  {
    //         throw  new Error('Padrão de Arquivo Inválido!');
    //     }
    // }

    // obtenhaNatureza(arrayElement) {
    //     let valorNatureza = (arrayElement[this.natureza]);

    //     if (valorNatureza !== 'C' || 'V') {
    //         valorNatureza = arrayElement[this.natureza + 1];
    //     }

    //     if (valorNatureza !== 'C' || 'V') {
    //         throw  new Error('Natureza inválida!');
    //     }

    //     return valorNatureza;
    // }

    public obtenhaNomeDaEmpresa() {
        return this.obtenhaNome(this.array);
    }

    private obtenhaNome(arrayElement) {
         let nome = arrayElement[this.nomeDaEmpresa].split(' ')[0];
         const prazo = new RegExp('^[0-9]{2}\/[0-9][0-9]{1}$');
         if (prazo.test(nome)) {
            nome = arrayElement[this.nomeDaEmpresa + 1].split(' ')[0];
         }
         // const nome = this.retireEspacos(arrayElement[3]);
         return nome.trim();
    }

    private retireEspacos(nome: string) {
         while (nome.indexOf('  ') > -1) {
             nome = nome.replace('  ', ' ');
         }

         return nome;
    }
}
