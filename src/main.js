import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import Badge from './components/Badge/Badge.vue';

import './assets/styles/entry.scss';

Vue.config.productionTip = false;

Vue.component(Badge.name, Badge);

new Vue({
  store,
  components: {
    App,
    Badge
  }
}).$mount("#app");
