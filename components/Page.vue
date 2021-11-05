<template>
  <div>
    <div id="spacer"></div>
    <div v-editable="blok" class="mt-28">
      <component
        v-for="blok in blok.body"
        :key="blok._uid"
        :blok="blok"
        :is="blok.component"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
@media screen and (min-width: 800px) {
  #spacer {
    width: 100vw;
    height: 500vh;
  }
}
</style>
