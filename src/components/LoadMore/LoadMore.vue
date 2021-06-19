<template>
  <div class="load-more">
    <div class="load-more__content">
      <slot />
    </div>
    <router-link></router-link>
  </div>
</template>

<script>


export default {
  name: 'load-more',
  props: {
    pageRedirect: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>