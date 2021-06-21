<template>
  <a :href="link" class="badge" :class="computedClass">{{ text }}</a>
</template>

<script>
export default {
  name: "badge",
  props: {
    text: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
      default: "#",
    },
  },
  computed: {
    computedClass() {
      return [`badge--${this.text}`];
    },
  },
};
</script>
