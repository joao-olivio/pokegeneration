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
  [FETCH_POKEMON_BY_ID]: ({ commit }, { pokemon }) => {
    return axios
      .get(`${POKEMON_API_URL}${pokemon}`)
      .then((result) => {
        commit(SET_POKEMON_DATA, { data: result.data });
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
    if (!state.pokemons) return [];
    const filtered = state.pokemons.filter((pokemon) => pokemon.number === id);
    return filtered[0] ? filtered[0] : [];
  },
  [GET_POKEMON_IS_LOADING]: (state) => {
    return state.isLoading;
  },
  [GET_POKEMONS]: (state) => {
    return state.pokemons || [];
  },
};

export const mutations = {
  [SET_POKEMON_DATA]: (state, { data }) => {
    state.pokemons = state.pokemons || [];
    state.pokemons.push(pokemonDataTransformer(data));

    state.pokemons = state.pokemons.sort((a, b) => a.number - b.number);

    Vue.set(state, "pokemons", state.pokemons);
  },
  [SET_POKEMON_IS_LOADING]: (state, payload) => {
    state.isLoading = payload;
  },
};
