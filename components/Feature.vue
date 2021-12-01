<template>
  <div
    v-editable="blok"
    class="h-full py-2 flex flex-col justify-center feature-container"
    id="services"
  >
    <img :src="blok.icon.filename" alt="" />

    <h1 class="text-lg text-left uppercase">{{ blok.name }}</h1>
    <p class="mt-8 text-white text-left">{{ blok.description }}</p>
    <div class="learn-more flex items-center">Learn More</div>
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
h1 {
  font-size: 2em;
  z-index: 10;
}

.learn-more {
  width: fit-content;
  height: 40px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  border: 2px solid white;
  justify-content: space-around;
  transition: background-color 0.5s ease, color 0.5s ease;
  padding: 1.5em;
  text-transform: uppercase;
  margin-top: 1em;
  font-family: 'Gotham Book', sans-serif;
}

img {
  height: 400px;
  object-fit: contain;
}

@media screen and (min-width: 800px) and (max-height: 801px){
  .learn-more {
    position: absolute;
    bottom: -3em;
  }
}

@media screen and (min-width: 800px) and (min-height: 801px){
  .learn-more {
    position: absolute;
    bottom: -3em;
  }
}
</style>
