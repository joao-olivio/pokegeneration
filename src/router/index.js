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
});
