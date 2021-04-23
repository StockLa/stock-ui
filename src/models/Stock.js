export default class Stock {
  constructor({ name, price, dateTime }) {
    this.name = name;
    this.price = price;
    this.dateTime = new Date(dateTime);
  }
}
