<template>
  <main class="homepage">
    <section class="homepage__heading">
      <div class="banner" v-animate-on-scroll>
        <div class="banner__image_wrapper content" tabindex="0">
          <img
            class="banner__image_wrapper__image"
            src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
            :alt="alternativeText"
            v-lazyload="backgroundImage"
          />
        </div>
        <div class="banner__content">
          <h1 class="banner__content__title title title--h1">
            {{ title }}
          </h1>
          <p class="banner__content__subtitle subtitle title--h2">
            {{ subtitle }}
          </p>
        </div>
      </div>
    </section>
    <section class="homepage__body container">
      <h2 class="homepage__body__title title title--h2">
        {{ generationsTitle }}
      </h2>
      <p class="homepage__body__subtitle subtitle">
        {{ generationsDescription }}
      </p>
      <LoadMore :items="allGenerations">
        <template #default="slotProps">
          <ul class="load-more__content load-more__content--generations">
            <li v-for="(generation, $key) in slotProps.items" :key="$key">
              <Card cardType="generation">
                <template>
                  <div class="card__content_wrapper">
                    <router-link :to="generation.url" class="content">
                      <h3 class="card__content_wrapper__title title title--h3">
                        {{ generation.name }}
                      </h3>
                    </router-link>
                  </div>
                </template>
              </Card>
            </li>
          </ul>
        </template>
      </LoadMore>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { lazyload } from "../directives/lazyload.client";
import { animateOnScroll } from "../directives/animateOnScroll.client";

import Card from "../components/Card/Card.vue";
import LoadMore from "../components/LoadMore/LoadMore.vue";

import {
  GET_GENERATIONS,
  FETCH_GENERATION_DATA,
  GET_GENERATIONS_LIST,
} from "../store/settings";

export default {
  name: "HomepagePage",
  directives: {
    lazyload,
    animateOnScroll,
  },
  components: {
    Card,
    LoadMore,
  },
  data() {
    return {
      backgroundImage: {
        0: "https://res.cloudinary.com/joao-olivio-neto/image/upload/e_improve,w_767,h_1150,c_thumb,g_auto/v1624147218/pokemon_pokeball_red-wallpaper-1920x1080_jrhpwi.jpg",
        768: "https://res.cloudinary.com/joao-olivio-neto/image/upload/c_scale,w_1024/v1624147218/pokemon_pokeball_red-wallpaper-1920x1080_jrhpwi.jpg",
        1024: "https://res.cloudinary.com/joao-olivio-neto/image/upload/c_scale,w_1440/v1624147218/pokemon_pokeball_red-wallpaper-1920x1080_jrhpwi.jpg",
        1440: "https://res.cloudinary.com/joao-olivio-neto/image/upload/v1624147218/pokemon_pokeball_red-wallpaper-1920x1080_jrhpwi.jpg",
      },
      alternativeText: "Welcome banner",
      title: "Welcome to Pokeworld",
      subtitle:
        "Here you'll find some information about the amazing world of Pokemon!",
      generationsTitle: "Generations",
      generationsDescription: `Pokémon is short for “Pocket Monsters", the original Japanese name. The franchise has its roots in a gaming magazine in the early 1980s in Japan—Game Freak, started by Satoshi Tajiri and Ken Sugimori. Tajiri was the writer, while Sugimori was the illustrator.`,
    };
  },
  mounted() {
    this[FETCH_GENERATION_DATA]();
  },
  methods: {
    ...mapActions([FETCH_GENERATION_DATA]),
  },
  computed: {
    ...mapGetters([GET_GENERATIONS, GET_GENERATIONS_LIST]),
    generationsList() {
      return this[GET_GENERATIONS_LIST];
    },
    allGenerations() {
      return this[GET_GENERATIONS];
    },
  },
};
</script>
