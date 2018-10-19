import { Processador } from './processador';
import { VerificaSeFinalizou } from './VerificaSeFinalizou';

export class ProximoDia extends Processador {
    public execute() {

        if (super.movaProximaData()) {

            const todosDiferente  = super.obtenhaTodosDiferenteDaEntrada();

            if (todosDiferente.length > 0) {
                this.itemAtual.debite(todosDiferente);
            } else {
                this.itemAtual.credite(super.obtenhaTodosDoMesmoTipoDaEntrada());
            }

            super.definaProximo(new VerificaSeFinalizou());
            super.execute();
        }
    }
}