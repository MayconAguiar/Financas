import { Processador } from './processador';
import { Nova } from './nova';
import { ProximoDia } from './proximoDia';

export class VerificaSeFinalizou extends Processador {
    public execute() {

        const finalizou = this.itemAtual.entrada.quantidade === this.itemAtual.saida.quantidade;

        if (finalizou) {
            super.definaProximo(new Nova());
        } else {
            super.definaProximo(new ProximoDia());
        }

        super.execute();
    }
}