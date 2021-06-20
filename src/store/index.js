import Vue from "vue";
import Vuex from "vuex";
import * as pokemonModule from "./modules/pokemon";
import * as generationModule from "./modules/generations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    pokemon: pokemonModule,
    generations: generationModule,
  },
});
