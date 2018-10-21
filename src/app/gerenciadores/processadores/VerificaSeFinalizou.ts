import { Processador } from './processador';
import { Nova } from './nova';
import { ProximoDia } from './proximoDia';
import { VerificaSeFinalizouParcial } from './verificaSeFinalizouParcial';

export class VerificaSeFinalizou extends Processador {
    public execute() {

        const finalizou = this.itemAtual.entrada.quantidade === this.itemAtual.saida.quantidade;

        if (finalizou) {
            super.definaProximo(new Nova());
        } else if(this.itemAtual.saida.quantidade > 0) {
            super.definaProximo(new VerificaSeFinalizouParcial());
        } else {
            super.definaProximo(new ProximoDia());
        }
        
        super.execute();
    }
}
