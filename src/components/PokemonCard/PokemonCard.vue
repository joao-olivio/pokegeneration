<template>
  <Card card-type="pokemon">
    <template #image>
      <div class="card__image_wrapper">
        <img
          v-if="pokemon.image"
          src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          :alt="pokemon.alternativeText"
          class="card__image_wrapper__image content"
          v-lazyload="pokemon.image"
        />
      </div>
    </template>
    <template>
      <div class="card__content_wrapper">
        <small class="card__content_wrapper__small small">
          {{ normalizedNumber }}
        </small>
        <h3 class="card__content_wrapper__title title title--h3">
          {{ pokemonName }}
        </h3>

        <div class="card__content_wrapper__badges">
          <badge
            v-for="(type, $id) in pokemon.type"
            :key="$id"
            :text="type.type.name"
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
import Card from "../Card/Card.vue";
import { lazyload } from "../../directives/lazyload.client";

import { mapActions, mapGetters } from "vuex";
const ROOT_MARGIN = "150px 150px 150px 150px";
const DEFAULT_THRESHOLD = [0.006];

import { FETCH_POKEMON_BY_ID, GET_POKEMON_BY_ID } from "../../store/settings";
import Badge from "../Badge/Badge.vue";

export default {
  components: { Card, Badge },
  directives: { lazyload },
  props: {
    generation: {
      type: String,
      required: true,
    },
    pokemonName: {
      type: String,
      required: true,
    },
    pokemonNumber: {
      type: Number,
      required: true,
    },
  },
  created() {
    Number.prototype.padLeft = function (n, str) {
      return Array(n - String(this).length + 1).join(str || "0") + this;
    };
  },
  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            this.requestPokemonInformation();
            observer.unobserve(this.$el);
          }
        });
      },
      { ROOT_MARGIN, DEFAULT_THRESHOLD }
    );

    observer.observe(this.$el);
  },
  computed: {
    ...mapGetters([GET_POKEMON_BY_ID]),
    pokemonData() {
      return this[GET_POKEMON_BY_ID](this.pokemonNumber, this.generation);
    },
    pokemon() {
      return this.pokemonData
        ? this.pokemonData
        : {
            image: { 0: "" },
            alternativeText: "",
            number: "",
            name: "",
            type: [],
            url: "/",
          };
    },
    normalizedNumber() {
      return `#${this.pokemonNumber.padLeft(3)}`;
    },
  },
  methods: {
    ...mapActions([FETCH_POKEMON_BY_ID]),
    requestPokemonInformation() {
      if (!this.pokemon.number) {
        this[FETCH_POKEMON_BY_ID]({
          pokemon: this.pokemonName,
          generation: this.generation,
        });
      }
    },
  },
};
</script>
