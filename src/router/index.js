import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/stock-stream' },
  {
    path: '/stock-stream',
    name: 'stock-stream',
    component: () => import(/* webpackChunkName: "stock-stream" */ '../views/StockStream.vue'),
  },
  {
    path: '/stock',
    name: 'stock',
    component: () => import(/* webpackChunkName: "stock" */ '../views/Stock.vue'),
  },
  {
    path: '/watch-delta',
    name: 'watch-delta',
    component: () => import(/* webpackChunkName: "stock-delta" */ '../views/StockDelta.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
