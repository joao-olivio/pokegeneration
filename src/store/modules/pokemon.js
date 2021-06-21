import Vue from "vue";
import axios from "axios";
import {
  POKEMON_API_URL,
  SET_POKEMON_IS_LOADING,
  GET_POKEMON_IS_LOADING,
  GET_POKEMON_BY_ID,
  SET_POKEMON_DATA,
  GET_POKEMONS,
  FETCH_POKEMON_BY_ID,
} from "../settings";

import { pokemonDataTransformer } from "../../utils/pokemonDataTransformer";

export const state = {
  pokemons: [],
  isLoading: false,
};

export const actions = {
  [FETCH_POKEMON_BY_ID]: ({ commit }, payload) => {
    return axios
      .get(`${POKEMON_API_URL}${payload}`)
      .then((result) => {
        commit(SET_POKEMON_DATA, result.data);
      })
      .catch((e) => {
        console.error(e);
      });
  },
  [SET_POKEMON_IS_LOADING]: ({ commit }, payload) => {
    commit(SET_POKEMON_IS_LOADING, payload);
  },
};

export const getters = {
  [GET_POKEMON_BY_ID]: (state) => (id) => {
    return state.pokemons.filter((pokemon) => pokemon.number === id);
  },
  [GET_POKEMON_IS_LOADING]: (state) => {
    return state.isLoading;
  },
  [GET_POKEMONS]: (state) => {
    return state.pokemons;
  },
};

export const mutations = {
  [SET_POKEMON_DATA]: (state, data) => {
    const pokemonsList = [...state.pokemons, pokemonDataTransformer(data)];
    Vue.set(
      state,
      "pokemons",
      pokemonsList.sort((a, b) => a.number - b.number)
    );
  },
  [SET_POKEMON_IS_LOADING]: (state, payload) => {
    state.isLoading = payload;
  },
};
