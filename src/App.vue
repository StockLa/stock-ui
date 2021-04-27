<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      >
        <v-toolbar-title>Stock UI</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn plain to="stock-stream">
          Stream Stock
        </v-btn>
        <v-btn plain to="stock">
          Get Stock
        </v-btn>
        <v-btn plain to="watch-delta">
          Watch Delta
        </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: { },

  data() {
    return {};
  },
};
</script>
