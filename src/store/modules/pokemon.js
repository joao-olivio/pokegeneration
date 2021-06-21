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
  [FETCH_POKEMON_BY_ID]: ({ commit }, { generation, pokemon }) => {
    return axios
      .get(`${POKEMON_API_URL}${pokemon}`)
      .then((result) => {
        commit(SET_POKEMON_DATA, { data: result.data, generation });
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
  [GET_POKEMON_BY_ID]: (state) => (id, generation) => {
    return state.pokemons[generation].filter(
      (pokemon) => pokemon.number === id
    );
  },
  [GET_POKEMON_IS_LOADING]: (state) => {
    return state.isLoading;
  },
  [GET_POKEMONS]: (state) => (generation) => {
    return state.pokemons[generation];
  },
};

export const mutations = {
  [SET_POKEMON_DATA]: (state, { data, generation }) => {
    state.pokemons[generation] = state.pokemons[generation] || [];
    state.pokemons[generation].push(pokemonDataTransformer(data));

    state.pokemons[generation] = state.pokemons[generation].sort(
      (a, b) => a.number - b.number
    );

    Vue.set(state, "pokemons", state.pokemons);
  },
  [SET_POKEMON_IS_LOADING]: (state, payload) => {
    state.isLoading = payload;
  },
};
