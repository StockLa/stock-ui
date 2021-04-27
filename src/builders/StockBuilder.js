import Stock from '@/models/Stock';

export default {
  buildFromEvent(data) {
    return Object.values(data).map(((value) => new Stock(value)));
  },
};
