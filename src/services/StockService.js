import { Observable } from 'rxjs';
import stockBuilder from '@/builders/StockBuilder';

class StockService {
  constructor(hostInformation) {
    const { hostname, port } = hostInformation;
    this.hostUrl = `http://${hostname}:${port}/`;
    this.stockPath = '/api/v1/stocks/';
  }

  getStocks(stocks) {
    return new Observable((observer) => {
      const url = new URL(this.stockPath, this.hostUrl);
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
    return new Observable((observer) => {
      const url = new URL(`${this.stockPath}${stock}`, this.hostUrl);
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

  watchDelta(stockRequest) {
    return new Observable((observer) => {
      const url = new URL(`${this.stockPath}delta`, this.hostUrl);
      stockRequest.stocks.forEach((stock) => {
        url.searchParams.append('stock', stock);
      });
      url.searchParams.append('delta', stockRequest.delta);
      url.searchParams.append('duration', stockRequest.duration);
      const source = new EventSource(url.toString());

      source.onmessage = ({ data }) => {
        const stocksData = stockBuilder.buildFromEvent(JSON.parse(data));
        observer.next(stocksData);
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

export default new StockService(window.location);
