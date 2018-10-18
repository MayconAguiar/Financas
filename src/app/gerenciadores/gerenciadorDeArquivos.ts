import { Observable } from 'rxjs/Observable';
import { ArquivosPDF } from '../arquivos/arquivosPDF';
import { ItemArquivo } from '../arquivos/itemArquivo';


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
