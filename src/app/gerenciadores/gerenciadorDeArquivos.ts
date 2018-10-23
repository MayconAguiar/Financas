import { Observable } from 'rxjs/Observable';
import { ItemArquivo } from '../importa-arquivo/arquivos/itemArquivo';
import { ArquivosPDF } from '../importa-arquivo/arquivos/arquivosPDF';

export class GerenciadorDeArquivos {

    private listaDeArquivos: FileList;
    private itensArquivo: ItemArquivo[] = [];

    constructor(listaDeArquivos: FileList) {
        this.listaDeArquivos = listaDeArquivos;
    }

    public processe() {
        return new Observable<any>(observer => {
            const arquivosPdf = new ArquivosPDF();

            arquivosPdf.obtenhaLista(this.listaDeArquivos)
            .subscribe(itensArquivo => {
                this.itensArquivo = itensArquivo;
            },
            err => { },
            () => {
                observer.next(this.itensArquivo);
                observer.complete();
            });
        });
    }
 }
