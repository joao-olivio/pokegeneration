<template>
  <div>Generation page</div>
</template>

<script>
import { GET_GENERATIONS } from "../store/settings";
import { mapGetters } from "vuex";
export default {
  name: "GenerationPage",
  mounted() {
    console.log(this.$route.params.slug);
    console.log(this[GET_GENERATIONS]);
  },
  computed: {
    ...mapGetters([GET_GENERATIONS]),
  },
};
</script>
