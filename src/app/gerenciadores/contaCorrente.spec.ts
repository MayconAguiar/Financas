import { ContaCorrente } from './contaCorrente';
import { ItemArquivo } from '../arquivos/itemArquivo';

describe('ContaCorrente', () => {
    it('retorna lista vazia quando os itens as entradas e saidas são vazias', () => {
        const gerenciador = new ContaCorrente();
        const result = gerenciador.processe([], []);
        expect(result.length).toBe(0);
      });

   it('retorna um itemDashboard para uma entrada', () => {
        const gerenciador = new ContaCorrente();
        const entradas: ItemArquivo[] = [];
        entradas.push(crieArquivo());

        const result = gerenciador.processe(entradas, []);
        expect(result.length).toBe(1);
    });

    const crieArquivo = function() {

        const itemArquivo = new ItemArquivo();

        itemArquivo.codigo = 1;
        itemArquivo.data = new Date();
        itemArquivo.empresa = 'Vale';
        itemArquivo.natureza = 'C';
        itemArquivo.preco = 10;
        itemArquivo.quantidade = 1000;

        return itemArquivo;
    };
});

