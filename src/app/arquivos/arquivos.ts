import { Observable } from "rxjs/Observable";
import { Subscriber } from "rxjs/Subscriber";

export class Arquivos {
    private lista = [];

    constructor() {
    }

    obtenhaLista(files: FileList) {
        return new Observable<any>(observer => this.leiaArquivo(files, 0, observer));
    }

    private leiaArquivo(files, index, observer: Subscriber<any>) {
        if (index < files.length) {
            const file: File = files.item(index);
            const reader: FileReader = new FileReader();
            reader.readAsText(file, 'ISO-8859-1');
            const that = this;
            reader.onload = (e) => {
                const csv = reader.result;
                index += 1;
                this.lista.push(that.csvJSON(csv));
                this.leiaArquivo(files, index, observer);
            };
        } else {
            observer.next(this.lista);
            observer.complete();
        }
    }

    private csvJSON(csv) {
        const lines = csv.split('\n');
        const result = [];
        const headers = lines[0].split(';');

        for (let i = 1; i < lines.length; i++) {
          const obj = {};
          if (lines[i] !== '') {
            const currentline = lines[i].split(';');

            for (let j = 0; j < headers.length; j++) {
              obj[headers[j]] = currentline[j];
            }

            result.push(obj);
          }
        }

        return JSON.stringify(result);
      }
}