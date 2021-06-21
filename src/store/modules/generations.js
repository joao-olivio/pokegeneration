import Vue from "vue";
import axios from "axios";
import {
  GET_GENERATIONS,
  GET_GENERATION_BY_ID,
  SET_GENERATION_DATA,
  GENERATION_API_URL,
  GET_POKEMON_FROM_GENERATION,
  GET_GENERATIONS_LIST,
  SET_GENERATIONS_LIST,
  FETCH_GENERATION_DATA,
  FETCH_GENERATION_BY_ID,
  SET_GENERATION_IS_LOADING,
  GET_GENERATION_IS_LOADING,
  GENERATION_RESET_DATA,
} from "../settings";

import { generationDataTransformer } from "../../utils/generationDataTransformer";
import { Promise } from "core-js";

export const state = {
  generationsList: [],
  generations: [],
  isLoading: false,
};

export const actions = {
  [FETCH_GENERATION_DATA]: ({ dispatch, commit }, callbackFunction) => {
    dispatch(SET_GENERATION_IS_LOADING, true);
    commit(GENERATION_RESET_DATA);
    axios
      .get(`${GENERATION_API_URL}`)
      .then(({ data }) => {
        commit(SET_GENERATIONS_LIST, data.results);
        const requestList = [];
        data.results.forEach((generation) => {
          requestList.push(dispatch(FETCH_GENERATION_BY_ID, generation));
        });
        Promise.all(requestList).then(() => {
          dispatch(SET_GENERATION_IS_LOADING, false);

          if (typeof callbackFunction === "function") callbackFunction();
        });
      })
      .catch((e) => {
        console.error(e);
        dispatch(SET_GENERATION_IS_LOADING, false);
      });
  },
  [SET_GENERATION_DATA]: ({ commit }, payload) => {
    commit(SET_GENERATION_DATA, payload);
  },
  [SET_GENERATION_IS_LOADING]: ({ commit }, payload) => {
    commit(SET_GENERATION_IS_LOADING, payload);
  },
  [FETCH_GENERATION_BY_ID]: ({ dispatch }, { url }) => {
    return axios
      .get(`${url}`)
      .then((result) => {
        dispatch(SET_GENERATION_DATA, result.data);
      })
      .catch((e) => {
        console.error(e);
      });
  },
};

export const getters = {
  [GET_GENERATIONS_LIST]: (state) => {
    return state.generationsList;
  },
  [GET_POKEMON_FROM_GENERATION]: (state) => (generationId) => {
    const [generation] = [...state.generations].filter(
      (generation) => generation.id === generationId
    );
    return generation.pokemons;
  },
  [GET_GENERATIONS]: (state) => {
    return state.generations;
  },
  [GET_GENERATION_BY_ID]: (state) => (generationId) => {
    const [generation] = [...state.generations].filter(
      (generation) => generation.slug === generationId
    );
    return generation;
  },
  [GET_GENERATION_IS_LOADING]: (state) => {
    return state.isLoading;
  },
};

export const mutations = {
  [SET_GENERATION_DATA]: (state, payload) => {
    const generation = generationDataTransformer(payload);
    let transformer = [...state.generations];
    transformer.push(generation);
    transformer = transformer.sort((a, b) => a.id - b.id);
    Vue.set(state, "generations", transformer);
  },
  [SET_GENERATION_IS_LOADING]: (state, payload) => {
    state.isLoading = payload;
  },
  [SET_GENERATIONS_LIST]: (state, payload) => {
    Vue.set(state, "generationsList", payload);
  },
  [GENERATION_RESET_DATA]: (state) => {
    Vue.set(state, "generations", []);
    Vue.set(state, "generationsList", []);
  },
};
