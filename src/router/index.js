import Vue from "vue";
import VueRouter from "vue-router";

import generation from "./generation";
import homepage from "./homepage";
import pokemon from "./pokemon";

const defaultPath = { path: "*", redirect: "/" };

Vue.use(VueRouter);

const routes = [generation, homepage, pokemon, defaultPath];

export default new VueRouter({
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
