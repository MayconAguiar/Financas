import { Processador } from "./processador";
import { ItemDashboard } from "../../negocio/ItemDashboard";
import { VerificaSeFinalizou } from "./VerificaSeFinalizou";

export class FinalizeParcialVendaMaior extends Processador {
    public execute() {
        // debugger;
        // // A venda é maior então eu obtenho a quantide de venda que irá finalizar
        // // a entrada
        // let quantidadeDeIndices = super.ObtenhaListaDeIndicesNaQuantidade(
        // this.itemAtual.saida, 
        // this.itemAtual.entrada.quantidade);
            
        // const novaentrada =  this.itemAtual.saida.Split(quantidadeDeIndices);
        // //o item atual está ok
        // this.itemAtual.atualizeValores();
            
        // // a nova saida será a nova entrada do atual
        // const novoItem = new ItemDashboard();
        // novoItem.entrada = novaentrada;            
        // novoItem.atualizeValores();
        
        // this.itemAtual = novoItem;
        // this.itensDashboard.push(novoItem);
        // this.definaProximo(new VerificaSeFinalizou());
        // super.execute();
    }
}
