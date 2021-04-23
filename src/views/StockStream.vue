<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <h2>Watch Stock</h2>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="4">
        <v-autocomplete
            v-model="stockSubscribed"
            :items="items"
            chips
            label="Stocks"
            multiple
            v-stream:change="stockSubscriptionChange$"
          ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col
      v-for="stock in stocks"
      :key="stock['name']"
      cols="2">
      <stock-card :stock="stock"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  of,
} from 'rxjs';

import {
  switchMap,
  map,
  debounceTime,
} from 'rxjs/operators';

import stockService from '@/services/StockService';
import StockCard from '../components/StockCard.vue';

export default {
  name: 'StockSteamView',
  domStreams: ['subscribe$', 'unsubscribe$', 'stockSubscriptionChange$'],
  data() {
    return {
      items: ['ibm', 'apple', 'citibank'],
      stockSubscribed: [],
    };
  },
  subscriptions() {
    return {
      stocks: this.stockSubscriptionChange$.pipe(
        debounceTime(100),
        map(({ event: { msg } }) => msg),
        switchMap((stocks) => (stocks.length ? stockService.getStocks(stocks) : of([]))),
      ),
    };
  },
  components: { StockCard },
};
</script>
