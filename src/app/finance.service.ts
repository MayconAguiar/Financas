import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class FinanceService {

  symbols = ['RADL3.SA'];
  
    constructor(private http: HttpClient) {}
  
    list(ary = this.symbols) {
      let q = `select Symbol,Name,LastTradePriceOnly,MarketCapitalization
      from yahoo.finance.quotes where symbol in ("${ary.join('", "')}")`;
      let url = 'https://query.yahooapis.com/v1/public/yql';
      
      return this.http.get(encodeURI(url), {
        params: new HttpParams().set('q', q)
        .set('env','store://datatables.org/alltableswithkeys')
        .set('format', 'json')
        .set('diagnostics', 'true')
      });
        // .map(data => data.json().query.results.quote);
    }
  
    history(start: Date, end: Date = new Date(), ary = this.symbols) {
      let q = `select Symbol,Date,Adj_Close from yahoo.finance.historicaldata where symbol in ("${ary.join('", "')}") and
      startDate="${start.toISOString().substr(0,10)}" and endDate="${end.toISOString().substr(0,10)}"|sort(field="Date")`;
      let url = `https://query.yahooapis.com/v1/public/yql?q=${q}
      &format=json&env=store://datatables.org/alltableswithkeys`;
      return this.http.get(encodeURI(url));
        // .map(data => data.json().query.results.quote);
    }

}
