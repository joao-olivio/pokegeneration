<template>
  <div class="load-more">
    <slot :items="items" />
    <slot name="footer" />
  </div>
</template>

<script>
export default {
  name: "load-more",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
