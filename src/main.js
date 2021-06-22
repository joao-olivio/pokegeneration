import Vue from "vue";
import store from "./store";
import router from "./router";

import App from "./App.vue";

import Badge from "./components/Badge/Badge.vue";
import Card from "./components/Card/Card.vue";
import LoadMore from "./components/LoadMore/LoadMore.vue";
import PokemonCard from "./components/PokemonCard/PokemonCard.vue";

import HomepagePage from "./pages/Homepage.vue";
import GenerationPage from "./pages/Generation.vue";
import PokemonPage from "./pages/Pokemon.vue";

import { lazyload } from "./directives/lazyload.client";
import { animateOnScroll } from "./directives/animateOnScroll.client";

import "./assets/styles/entry.scss";

Vue.config.productionTip = false;

Vue.directive(lazyload.name, lazyload);
Vue.directive(animateOnScroll.name, animateOnScroll);

Vue.component(Badge.name, Badge);
Vue.component(Card.name, Card);
Vue.component(LoadMore.name, LoadMore);
Vue.component(PokemonCard.name, PokemonCard);

Vue.component(HomepagePage.name, HomepagePage);
Vue.component(GenerationPage.name, GenerationPage);
Vue.component(PokemonPage.name, PokemonPage);

if (process.env.VUE_APP_DS === "true") {
  new Vue({
    el: "#main-container",
    store,
    router,
  });
} else {
  new Vue({
    store,
    router,
    render: (h) => h(App),
  }).$mount("#app");
}
