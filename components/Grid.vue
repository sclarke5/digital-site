<template>
  <ul
    v-editable="blok"
    class="flex py-8 mb-6 grid-container">
    <li
      :key="blok._uid"
      v-for="blok in blok.columns"
      class="flex-auto px-6 tex-center w-1/3 text-white">
      <component :blok="blok" :is="blok.component" />
    </li>
  </ul>
</template>
 
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
  .grid-container {
    transform: rotate(90deg);
    margin-bottom: 200vh;
  }
</style>