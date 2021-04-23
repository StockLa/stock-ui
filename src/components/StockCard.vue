<template>
  <v-card>
    <v-card-title>{{stock['name']}}</v-card-title>
    <v-card-text>{{stock['price']}}</v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'Stock',
  props: {
    stock: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return { };
  },
};
</script>
