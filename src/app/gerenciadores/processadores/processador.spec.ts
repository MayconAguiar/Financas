import { Nova } from '../Nova';
import { FinalizeNoMesmoDia } from './finalizeNoMesmoDia';

describe('Processador', () => {
    it('verifica a execucao do novo', () => {
        const nova = new Nova();
        nova.execute();
        const result = nova.teste;
        expect(result).toBe('Classe Nova');
      });

      it('verifica resultado quando setado o proximo', () => {
        const nova = new Nova();
        const finalize = new FinalizeNoMesmoDia();
        nova.definaProximo(finalize);
        nova.execute();
        const result = finalize.teste;
        expect(result).toBe('Finalize mesmo dia');
      });

});


