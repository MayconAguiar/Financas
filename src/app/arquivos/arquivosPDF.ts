import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { PDFJSStatic } from 'pdfjs-dist';
import { Tipos } from '../tipos.enum';
import { Taxas } from '../negocio/taxas';
import { ItemArquivo } from './itemArquivo';
declare var require: any;

export class ArquivosPDF {
    private lista: ItemArquivo[] = [];

    constructor() {
    }

    obtenhaLista(files: FileList) {
        return new Observable<ItemArquivo[]>(observer => this.leiaArquivo(files, 0, observer));
    }

    private leiaArquivo(files, index, observer: Subscriber<ItemArquivo[]>) {
        const PDFJS: PDFJSStatic = require('pdfjs-dist');

        PDFJS.GlobalWorkerOptions.workerSrc = '../assets/pdf.worker.min.js';

        const that = this;

        if (index < files.length) {

             const file: File = files.item(index);
             const reader: FileReader = new FileReader();


             reader.onload = (event: any) => {
                 const typedarray = event.target.result;

                this.ObtenhaDocumento(PDFJS, typedarray).then(texts => {
                    for (let y = 0; y < texts.length; y++) {
                        const element = texts[y];
                        that.lista.push(element);
                    }
                    index += 1;
                    // debugger;
                    this.leiaArquivo(files, index, observer);
                });
             };

            reader.readAsArrayBuffer(file);
        } else {
            observer.next(this.lista);
            // console.log('lista com todos');
            // console.log(this.lista);
             observer.complete();
        }
    }

    private ObtenhaDocumento(PDFJS, typedarray) {
        const that = this;

        return PDFJS.getDocument(typedarray, new Uint8Array(typedarray)).then( pdf => {


            const maxPages = pdf.pdfInfo.numPages;
            const countPromises = []; // collecting all page promises



            for (let j = 1; j <= maxPages; j++) {


               const page = pdf.getPage(j);
               const listaDeLinhas = [];


               countPromises.push(page.then(function(pageInterno) { // add page promise


                    const textContent = pageInterno.getTextContent();


                    return textContent.then(function(text) { // return content promise

                        let listaItens = [];
                        let lastY = -1;

                        text.items.forEach(function (i) {


                         // Tracking Y-coord and if changed create new p-tag
                        //  console.log(i.transform);
                         lastY = lastY === -1 ? i.transform[5] : lastY;

                         const novaLinha = lastY !== i.transform[5];

                         if (novaLinha) {
                           // listaDeLinhas.push(i.textContent);
                           lastY = i.transform[5];
                           that.adicioneLinha(listaItens, listaDeLinhas);
                           listaItens = [];
                         }

                         if (that.ehElementoValido(i.str)){
                            listaItens.push(i.str);
                         }

                       });

                       that.adicioneLinha(listaItens, listaDeLinhas);
                       return listaDeLinhas;
                   });

               }));
            }
            // Wait for all pages and join text
            return Promise.all(countPromises).then(function (listas) {
                const novalista: ItemArquivo[] = [];

                for (let i = 0; i < listas.length; i++) {
                    const pagina = listas[i];

                    // console.log('pagina de dados');
                    // console.log(pagina);
                    const listaDeAcoes = that.obtenhaListaFormatada(pagina);
                    // console.log('lista de acoes');
                    // console.log(listaDeAcoes);
                    listaDeAcoes.forEach(x => novalista.push(x));
                }

                return novalista;
            });
        });

    }

    ehElementoValido(item: string) {
        return item.trim() !== '';
    }

    obtenhaListaFormatada(lista: string[]) {

        const novaLista = [];
        const indiceData = lista.indexOf('Data pregão') + 1;
        let codigo = Number(lista[indiceData].replace(/\D/g, ''));

        const data = lista[indiceData];


        for (let index = 0; index < lista.length; index++) {
            const element = lista[index];
            const arrayElement = element.split(';');
            const tipo = this.ObtenhaTipo(element);


            if (tipo === Tipos.NAO_ATENDIDO) {
                // console.log('tipo não atendido:');
                // console.log(element);
                continue;
            }

            const itemarquivo = new ItemArquivo();

            codigo += 1;
            itemarquivo.natureza = arrayElement[1];
            itemarquivo.codigo = codigo;
            itemarquivo.data = this.obtenhaDataFormatada(data);
            itemarquivo.origem = arrayElement;
            itemarquivo.tipo = tipo;

            const ultimoElemento = arrayElement.length - 1;

            switch (tipo) {
                case Tipos.SWING_TRADE:
                    itemarquivo.empresa = arrayElement[4].split(' ')[0];
                    itemarquivo.quantidade = Number(arrayElement[ultimoElemento - 3].replace(/\D/g, ''));
                    itemarquivo.preco = parseFloat(arrayElement[ultimoElemento - 2].replace(/,/g, '.'));

                    break;
                case Tipos.OPCOES:
                    itemarquivo.empresa = arrayElement[4].split(' ')[0];
                    itemarquivo.quantidade = Number(arrayElement[ultimoElemento - 3].replace(/\D/g, ''));
                    itemarquivo.preco = parseFloat(arrayElement[ultimoElemento - 2].replace(/,/g, '.'));
                    break;
                default:
                    break;
            }

            itemarquivo.taxas = new Taxas(itemarquivo);
            //if (itemarquivo.empresa === 'PORTOBELLO') {
                novaLista.push(itemarquivo);
            //}

        }
        return novaLista;
    }

    private obtenhaDataFormatada(value) {
        const itensData = value.substr(0, 10).split('/');
        const mes = Number(itensData[1]) - 1;
        return new Date(Number(itensData[2]), mes, Number(itensData[0]));
    }

    private adicioneLinha(listaItens: any[], listaDeLinhas: any[]) {
        const linha = listaItens.join(';');
        listaDeLinhas.push(linha);

    }

    private ObtenhaTipo(linha: string) {
        let tipo = Tipos.NAO_ATENDIDO;

        if (linha.indexOf('1-BOVESPA') > -1) {
            tipo =  linha.indexOf('OPCAO DE COMPRA') > -1 ||
            linha.indexOf('OPCAO DE VENDA') > -1 ? Tipos.OPCOES : Tipos.SWING_TRADE;
        }

        return tipo;
    }
}