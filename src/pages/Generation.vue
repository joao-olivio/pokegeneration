<template>
  <main class="generation-page">
    <section class="generation-page__heading">
      <div class="banner" v-animate-on-scroll>
        <div class="banner__background content" tabindex="0"></div>
        <div class="banner__content">
          <h1 class="banner__content__title title title--h1">
            {{ generationTitle }}
          </h1>
          <h3 class="banner__content__content-item">
            <strong>Main region: </strong> {{ getCurrentRegion.mainRegion }}
          </h3>
          <h3>
            <strong>Number of new Pokemons: </strong>
            {{ getCurrentRegion.pokemons.length }}
          </h3>
        </div>
      </div>
    </section>
    <section class="generation-page__body container">
      <LoadMore
        :items="pokemonListFullInformation"
        v-if="!showAllGenerations && !isFetchingData"
      >
        <template #default="slotProps">
          <ul class="load-more__content load-more__content--pokemon">
            <li v-for="(pokemon, $key) in slotProps.items" :key="$key">
              <card card-type="pokemon">
                <template #image>
                  <div class="card__image_wrapper">
                    <img
                      src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                      :alt="pokemon.alternativeText"
                      class="card__image_wrapper__image content"
                      v-lazyload="pokemon.image"
                    />
                  </div>
                </template>
                <template>
                  <div class="card__content_wrapper">
                    <router-link :to="pokemon.url">
                      <small class="card__content_wrapper__small small">
                        {{ pokemon.number }}
                      </small>
                      <h3 class="card__content_wrapper__title title title--h3">
                        {{ pokemon.name }}
                      </h3>
                    </router-link>
                    <div class="card__content_wrapper__badges">
                      <badge
                        v-for="(type, $id) in pokemon.type"
                        :key="$id"
                        :text="type.type.name"
                      />
                    </div>
                  </div>
                </template>
              </card>
            </li>
          </ul>
        </template>
      </LoadMore>
      <h2 v-if="isFetchingData">Loading...</h2>
    </section>
  </main>
</template>

<script>
import {
  FETCH_POKEMON_BY_ID,
  GET_GENERATIONS,
  GET_GENERATION_BY_ID,
  GET_POKEMONS,
  GET_POKEMON_IS_LOADING,
  SET_POKEMON_IS_LOADING,
} from "../store/settings";
import { mapGetters, mapActions } from "vuex";
import LoadMore from "../components/LoadMore/LoadMore.vue";
import Badge from "../components/Badge/Badge.vue";
export default {
  components: { LoadMore, Badge },
  name: "GenerationPage",
  data() {
    return {
      slug: this.$route.params.slug,
    };
  },
  mounted() {
    this.getPokemonsFromGeneration();
  },
  computed: {
    ...mapGetters([
      GET_GENERATIONS,
      GET_GENERATION_BY_ID,
      GET_POKEMONS,
      GET_POKEMON_IS_LOADING,
    ]),
    pokemonListFullInformation() {
      return this[GET_POKEMON_IS_LOADING] ? [] : this[GET_POKEMONS](this.slug);
    },
    generationTitle() {
      return !this.showAllGenerations
        ? this[GET_GENERATION_BY_ID](this.slug).name
        : "All generations";
    },
    generationPokemonNumber() {
      return 0;
    },

    getCurrentRegion() {
      return this[GET_GENERATION_BY_ID](this.slug);
    },

    showAllGenerations() {
      return this.slug === undefined;
    },

    isFetchingData() {
      return this[GET_POKEMON_IS_LOADING];
    },
  },
  methods: {
    ...mapActions([FETCH_POKEMON_BY_ID, SET_POKEMON_IS_LOADING]),
    getPokemonsFromGeneration() {
      if (this.pokemonListFullInformation) return;
      if (this.slug) {
        this[SET_POKEMON_IS_LOADING](true);
        const promiseList = [];
        this.getCurrentRegion.pokemons.forEach((pokemon) => {
          promiseList.push(
            this[FETCH_POKEMON_BY_ID]({
              generation: this.slug,
              pokemon: pokemon.name,
            })
          );
        });
        Promise.all(promiseList).then(() => {
          this[SET_POKEMON_IS_LOADING](false);
        });
      }
    },
  },
};
</script>
