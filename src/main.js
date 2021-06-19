import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from './router';

import Badge from './components/Badge/Badge.vue';
import Card from './components/Card/Card.vue';

import LoadMore from './components/LoadMore/LoadMore.vue';

import './assets/styles/entry.scss';

Vue.config.productionTip = false;

Vue.component(Badge.name, Badge);
Vue.component(Card.name, Card);
Vue.component(LoadMore.name, LoadMore);

new Vue({
  store,
  router,
  components: {
    App,
    Badge,
    Card,
    LoadMore
  }
}).$mount("#app");
