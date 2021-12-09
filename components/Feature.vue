<template>
  <div
    v-editable="blok"
    class="
      h-full
      py-2
      flex flex-col
      justify-center
      feature-container
      text-white
    "
    id="services"
  >
    <img :src="blok.icon.filename" alt="" class="py-6" />
    <h3 class="text-left">{{ blok.name }}</h3>
    <p class="my-4 text-left">{{ blok.description }}</p>
    <!-- <div class="learn-more flex items-center">
      <button>
      <p>Learn More</p></button></div> -->
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
.learn-more {
  width: fit-content;
  height: 40px;
  font-size: 14px;
  justify-content: space-around;
  transition: background-color 0.5s ease, color 0.5s ease;
  padding: 1.5em;
  margin-top: 1em;
}

img {
  height: 300px;
  object-fit: contain;
}

@media screen(laptop) {
  .learn-more {
    position: absolute;
    bottom: -3em;
  }
}
</style>
