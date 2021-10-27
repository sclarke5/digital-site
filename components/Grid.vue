<template>
<div class="grid-container w-1/2">
  <h1 class="text-white">Our Services</h1>
  <ul
    v-editable="blok"
    class="flex py-8 mb-6">
    <li
      :key="blok._uid"
      v-for="blok in blok.columns"
      class="flex-auto px-6 tex-center w-1/3 text-white">
      <component :blok="blok" :is="blok.component" />
    </li>
  </ul>
</div>

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
    margin-left: 30em;
  }

  .grid-container h1 {
    font-size: 3em;
    font-family: 'Gotham', sans-serif;
    text-transform: uppercase;
    font-weight: 800;
  }
</style>