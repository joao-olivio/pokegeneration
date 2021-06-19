<template>
  <article class="card" :class="cardClass">
    <slot name="image" />
    <slot />
    <slot name="footer" />
  </article>
</template>

<script>
export default {
  name: "card",
  props: {
    cardType: {
      type: String,
      required: false
    }
  },
  computed: {
    cardClass() {
      return [
        this.cardType ? `card--${this.cardType}`: ''
      ]
    }
  },
};
</script>
