import { ItemDashboard } from './ItemDashboard';

export class Resumo  {
    taxas = 0;
    lucroOuPrejuizo = 0;
    lucroLiquido = 0;
    totalVenda = 0;
    impostoDevido = 0;
    impostoRetido = 0;
    impostoAPagar = 0;
    taxaDeLiquidacao = 0;
    corretagem = 0;
    emolumentos = 0;
    iss = 0;

    constructor(itens: ItemDashboard[]) {
        this.construa(itens);
    }

    private construa(itens: ItemDashboard[]) {
        itens.forEach( x => {
            //// this.taxas += x.resumo.taxas;
            this.lucroOuPrejuizo += x.resumo.lucroOuPrejuizo;
            this.totalVenda += x.resumo.totalVenda;
            this.taxaDeLiquidacao += x.resumo.taxaDeLiquidacao;
            this.corretagem += x.resumo.corretagem;
            this.emolumentos += x.resumo.emolumentos;
            // this.impostoRetido += x.resumo.impostoRetido;
        });

        this.iss = this.corretagem * 0.0965;
        this.taxas = this.taxaDeLiquidacao + this.corretagem + this.emolumentos + this.iss;

        if (this.totalVenda > 20000) {
          this.impostoRetido = this.totalVenda *  0.00005;
        }

        this.lucroLiquido = this.lucroOuPrejuizo - this.taxas - this.impostoRetido;
        this.impostoDevido = this.lucroLiquido > 0 ? this.lucroLiquido * 0.15 : 0;
    }

}
