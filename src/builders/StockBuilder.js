import Stock from '@/models/Stock';

export default {
  buildFromEvent(data) {
    return data.map((stockData) => new Stock(stockData));
  },
};
