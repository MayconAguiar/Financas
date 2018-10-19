import { Processador } from './processador';
import { ItemDashboard } from '../../negocio/ItemDashboard';
import { VerificaSeFinalizou } from './VerificaSeFinalizou';

export class Nova extends Processador {

    public execute() {

        if (this.movaProximaData()) {
            let entrada = this.entradasNoDia;
            let saidas = this.saidasNoDia;

            if (this.obtenhaQuantidadeEntradas() < this.obtenhaQuantidadeSaidas() ) {
               entrada = saidas;
               saidas = this.entradas;
            }

            this.itemAtual = new ItemDashboard();
            this.itemAtual.credite(entrada);
            this.itemAtual.debite(saidas);

            this.itensDashboard.push(this.itemAtual);

            super.definaProximo(new VerificaSeFinalizou());
            super.execute();
        }
    }
}
