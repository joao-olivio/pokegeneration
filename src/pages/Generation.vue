<template>
  <main class="generation-page">
    <section class="generation-page__heading">
      <div class="banner" v-animate-on-scroll>
        <div class="banner__background content" tabindex="0"></div>
        <div class="banner__content">
          <h1 class="banner__content__title title title--h1">
            {{ generationTitle }}
          </h1>
        </div>
      </div>
    </section>
    <section class="generation-page__body">
      <LoadMore :items="pokemonListFullInformation" v-if="!showAllGenerations">
        <template #default="slotProps">
          <ul>
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
                    <small class="card__content_wrapper__small small">
                      {{ pokemon.number }}
                    </small>
                    <h3 class="card__content_wrapper__title title title--h3">
                      {{ pokemon.name }}
                    </h3>
                    <div class="card__content_wrapper__badges">
                      <badge
                        v-for="(type, $id) in pokemon.types"
                        :key="$id"
                        :title="type.name"
                      />
                    </div>
                  </div>
                </template>
              </card>
            </li>
          </ul>
        </template>
      </LoadMore>
    </section>
  </main>
</template>

<script>
import { GET_GENERATIONS, GET_GENERATION_BY_ID } from "../store/settings";
import { mapGetters } from "vuex";
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
    console.log("mamamaaaaa");
  },
  computed: {
    ...mapGetters([GET_GENERATIONS, GET_GENERATION_BY_ID]),
    pokemonListFullInformation() {
      return [];
    },
    generationTitle() {
      return !this.showAllGenerations
        ? this[GET_GENERATION_BY_ID](this.slug).name
        : "All generations";
    },
    showAllGenerations() {
      return this.slug === undefined;
    },
  },
};
</script>
