import { Observable } from 'rxjs';
import stockBuilder from '@/builders/StockBuilder';

class StockService {
  constructor(hostUrl) {
    this.hostUrl = hostUrl;
    this.stockPath = '/api/v1/stocks/';
  }

  getStocks(stocks) {
    const url = new URL(this.stockPath, this.hostUrl);
    return new Observable((observer) => {
      stocks.forEach((stock) => {
        url.searchParams.append('stock', stock);
      });

      const source = new EventSource(url.toString());

      source.onmessage = ({ data }) => {
        const stocksData = stockBuilder.buildFromEvent(JSON.parse(data));
        console.log(stocksData);
        observer.next(stocksData);
      };

      source.onerror = () => {
        source.close();
        observer.complete();
      };

      return () => {
        source.close();
      };
    });
  }

  getStock(stock) {
    console.log('stock', stock);
    const url = new URL(`${this.stockPath}${stock}`, this.hostUrl);
    return new Observable((observer) => {
      const source = new EventSource(url.toString());

      source.onmessage = ({ data }) => {
        const stocksData = stockBuilder.buildFromEvent(JSON.parse(data));
        observer.next(stocksData[0]);
      };

      source.onerror = (err) => {
        console.log('on error', { err });
        source.close();
        observer.complete();
      };

      return () => {
        source.close();
      };
    });
  }
}

export default new StockService('http://localhost.staging-achilles.systems:8080');
