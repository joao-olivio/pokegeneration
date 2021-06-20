import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import Badge from "./components/Badge/Badge.vue";
import Card from "./components/Card/Card.vue";
import LoadMore from "./components/LoadMore/LoadMore.vue";

import { lazyload } from "./directives/lazyload.client";
import { animateOnScroll } from "./directives/animateOnScroll.client";

import "./assets/styles/entry.scss";

Vue.config.productionTip = false;

Vue.directive(lazyload.name, lazyload);
Vue.directive(animateOnScroll.name, animateOnScroll);

Vue.component(Badge.name, Badge);
Vue.component(Card.name, Card);
Vue.component(LoadMore.name, LoadMore);

new Vue({
  el: "#app",
  store,
  router,
  components: {
    App,
    Badge,
    Card,
    LoadMore,
  },
});
