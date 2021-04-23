<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <h2>Get your stock</h2>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="4">
        <v-autocomplete
            v-model="stockSubscribed"
            :items="items"
            label="Stocks"
          ></v-autocomplete>
      </v-col>
      <v-col cols="1">
          <v-btn v-stream:click="fetchStock$">
            Get Stock
          </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <stock-card v-if="stock" :stock="stock"/>
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
  tap,
} from 'rxjs/operators';

import stockService from '@/services/StockService';
import StockCard from '../components/StockCard.vue';

export default {
  name: 'StockView',
  domStreams: ['fetchStock$'],
  data() {
    return {
      items: ['ibm', 'apple', 'citibank'],
      stockSubscribed: null,
    };
  },
  computed: {
    hasSelectedStock() {
      return !!this.stockSubscribed;
    },
  },
  subscriptions() {
    return {
      stock: this.fetchStock$.pipe(
        tap((value) => {
          console.log(value);
        }),
        switchMap(() => {
          if (this.hasSelectedStock) {
            return stockService.getStock(this.stockSubscribed);
          }
          return of([]);
        }),
        tap((value) => {
          console.log(value);
        }),
      ),
    };
  },
  components: { StockCard },
};
</script>
