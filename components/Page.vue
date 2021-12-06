<template>
  <div class="h-screen">
    <div id="spacer"></div>
    <div v-editable="blok" class="mt-28">
      <component
        class="component-block"
        v-for="blok in blok.body"
        :key="blok._uid"
        :is="blok.component"
        :blok="blok"
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
/* #spacer {
  width: 100vw;
  height: 100vh;
  margin-top: -100vh;
} */

@media screen and (min-width: 800px) {
  #spacer {
    width: 100vw;
    height: 300vh;
    margin-bottom: 200vh;
  }
}
</style>
