<template>
  <v-card>
    <v-card-title>{{displayName}}</v-card-title>
    <v-card-subtitle>{{displayPrice}}</v-card-subtitle>
    <v-card-text>{{stock.dateTime}}</v-card-text>
  </v-card>
</template>

<script>

import Stock from '@/models/Stock';

export default {
  name: 'Stock',
  props: {
    stock: {
      type: Stock,
      default: () => ({}),
    },
  },
  computed: {
    displayName() {
      return this.stock.name.toUpperCase();
    },
    displayPrice() {
      return `$ ${this.stock.price}`;
    },
  },
  data() {
    return { };
  },
};
</script>
