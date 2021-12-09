<template>
  <div
    v-editable="blok"
    class="
      mb-6
      md:ml-64
      mt-96
      px-8
      text-5xl
      font-bold
      text-left
      teaser-container
      md:w-2/3
    "
  >
    <div class="about-us-content flex-col justify-center pt-32">
      <h1 class="text-5xl text-white">{{ blok.headline }}</h1>
      <p class="text-2xl text-gray-400 pt-6">{{ blok.body_1 }}</p>
    </div>
    <div>
      <p class="text-2xl text-gray-400 pt-6">{{ blok.body_2 }}</p>
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
@media screen(laptop) {
  img {
    height: 90vh;
  }
  .teaser-container {
    transform: rotate(90deg);
    margin-bottom: 200vh;
    margin-top: 30em;
  }
}
</style>
