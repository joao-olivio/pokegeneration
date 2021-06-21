<template>
  <main class="generation-page">
    <section class="generation-page__heading">
      <h1 class="title title--h1">
        {{ getCurrentRegion.name }}
      </h1>
      <h3 class="subtitle title--h3">
        <strong>Main region: </strong> {{ getCurrentRegion.mainRegion }}
      </h3>
      <h3 class="subtitle title--h3">
        <strong>Number of new Pokemons: </strong>
        {{ getCurrentRegion.pokemons.length }}
      </h3>
    </section>
    <section class="generation-page__body container">
      <LoadMore
        :items="pokemonListFullInformation"
        v-show="!isFetchingGenerationData"
      >
        <template #default="slotProps">
          <ul class="load-more__content load-more__content--pokemon">
            <li v-for="(pokemon, $key) in slotProps.items" :key="$key">
              <pokemon-card
                :pokemonName="pokemon.name"
                :generation="slug"
                :pokemonNumber="pokemon.id"
              ></pokemon-card>
            </li>
          </ul>
        </template>
      </LoadMore>
      <h2 v-show="isFetchingGenerationData">Loading...</h2>
    </section>
  </main>
</template>

<script>
import {
  FETCH_GENERATION_BY_ID,
  FETCH_GENERATION_DATA,
  GET_GENERATIONS,
  GET_GENERATION_BY_ID,
  GET_GENERATION_IS_LOADING,
  SET_GENERATION_IS_LOADING,
} from "../store/settings";

import { mapGetters, mapActions } from "vuex";

import LoadMore from "../components/LoadMore/LoadMore.vue";
import PokemonCard from "../components/PokemonCard/PokemonCard.vue";

export default {
  components: { LoadMore, PokemonCard },
  name: "GenerationPage",
  data() {
    return {
      slug: this.$route.params.slug,
      generationName: "",
      generationPokemons: [],
      generationMainRegion: "",
    };
  },
  mounted() {
    this[SET_GENERATION_IS_LOADING](true);

    if (this.$route.params.slug) this[SET_GENERATION_IS_LOADING](false);

    if (!this.getCurrentRegion) {
      this[FETCH_GENERATION_DATA]();
    }
  },
  computed: {
    ...mapGetters([
      GET_GENERATIONS,
      GET_GENERATION_BY_ID,
      GET_GENERATION_IS_LOADING,
    ]),
    pokemonListFullInformation() {
      return this.getCurrentRegion ? this.getCurrentRegion.pokemons : [];
    },
    getCurrentRegion() {
      return this[GET_GENERATION_BY_ID](this.slug);
    },

    showAllGenerations() {
      return this.slug === undefined;
    },

    isFetchingGenerationData() {
      return this[GET_GENERATION_IS_LOADING];
    },
  },
  methods: {
    ...mapActions([
      FETCH_GENERATION_BY_ID,
      FETCH_GENERATION_DATA,
      SET_GENERATION_IS_LOADING,
    ]),
  },
};
</script>
