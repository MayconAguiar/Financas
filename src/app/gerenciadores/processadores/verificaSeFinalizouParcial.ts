import { Processador } from './processador';
import { Nova } from './nova';
import { ProximoDia } from './proximoDia';
import { ItemDashboard } from '../../negocio/ItemDashboard';
import { EntradaOuSaida } from '../../negocio/EntradaOuSaida';
import { FinalizeParcialVendaMaior } from './finalizeParcialVendaMaior';
import { FinalizeParcialVendaMenor } from './finalizeParcialVendaMenor';

export class VerificaSeFinalizouParcial extends Processador {
    public execute() {

        const quantidade = this.itemAtual.saida.quantidade;
        let proximo: Processador;
        
        if (this.itemAtual.entrada.quantidade < this.itemAtual.saida.quantidade) {
            proximo = new FinalizeParcialVendaMaior();
        } else {
            proximo = new FinalizeParcialVendaMenor();
        }
        super.definaProximo(proximo);
        super.execute();
    }
}