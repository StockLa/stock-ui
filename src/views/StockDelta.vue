<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <h2>Watch Stock delta</h2>
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
    <v-row class="text-center">
      <v-col cols="4">
        <v-slider
        label="Duration"
        max="5"
        min="2"
        v-model="duration"
        thumb-label="always"
        v-stream:change="durationChange$" />
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="4">
        <v-slider
        label="Delta %"
        max="90"
        min="20"
        step="10"
        v-model="delta"
        thumb-label="always"
        v-stream:change="deltaChange$" />
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
  combineLatest,
  of,
} from 'rxjs';

import {
  switchMap,
  map,
  debounceTime,
  startWith,
  tap,
} from 'rxjs/operators';

import stockService from '@/services/StockService';
import StockCard from '../components/StockCard.vue';

export default {
  name: 'StockDeltaView',
  domStreams: ['deltaChange$', 'durationChange$', 'stockSubscriptionChange$'],
  data() {
    return {
      items: ['ibm', 'apple', 'citibank'],
      stockSubscribed: [],
      duration: 2,
      delta: 20,
    };
  },
  subscriptions() {
    return {
      stocks: combineLatest(
        this.stockSubscriptionChange$.pipe(map(({ event }) => event.msg)),
        this.durationChange$.pipe(
          startWith({ event: { msg: this.duration } }),
          map(({ event }) => event.msg),
        ),
        this.deltaChange$.pipe(
          startWith({ event: { msg: this.delta } }),
          map(({ event }) => event.msg),
          map((deltaChange) => deltaChange / 100),
        ),
      ).pipe(
        debounceTime(100),
        tap(([one, two, three]) => console.log({ one, two, three })),
        map(([stocks, duration, delta]) => ({ stocks, duration, delta })),
        switchMap(({ stocks, duration, delta }) => (stocks.length ? stockService.watchDelta({
          stocks,
          delta,
          duration,
        }) : of([]))),
      ),
    };
  },
  components: { StockCard },
};
</script>
