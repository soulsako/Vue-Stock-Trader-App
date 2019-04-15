import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import VueRouter from 'vue-router'
import { router } from './routes'

Vue.use(VueRouter);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
