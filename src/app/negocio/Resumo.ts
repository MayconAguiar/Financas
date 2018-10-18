import { ItemDashboard } from './ItemDashboard';

export class Resumo  {
    taxas = 0;
    lucroOuPrejuizo = 0;
    lucroLiquido = 0;
    totalVenda = 0;
    impostoDevido = 0;
    impostoRetido = 0;
    impostoAPagar = 0;

    constructor(itens: ItemDashboard[]) {
        this.construa(itens);
    }

    private construa(itens: ItemDashboard[]) {
        itens.forEach( x => {
            this.taxas += x.resumo.taxas;
            this.lucroOuPrejuizo += x.resumo.lucroOuPrejuizo;
            this.totalVenda += x.resumo.totalVenda;
            this.impostoRetido += x.resumo.impostoRetido;            
        });
        
        this.lucroLiquido = this.lucroOuPrejuizo - this.taxas - this.impostoRetido; 
        this.impostoDevido = this.lucroLiquido >0 && this.totalVenda > 20000? this.lucroLiquido * 0.15 : 0;

    }

}