<template>
  <div
    v-editable="blok"
    class="py-2 flex flex-col feature-container">
    <video autoplay="autoplay" loop muted>
      <source :src="blok.animation.filename" type="video/mp4">
    </video>
    <h1 class="text-lg text-left uppercase">{{ blok.name }}</h1>
    <p class="mt-8 text-white text-left"> {{ blok.description }}</p>
    <div class="learn-more flex items-center" >
      Learn More
    </div>
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
	h1 {
		font-family: 'Gotham', sans-serif;
    font-weight: 800;
    font-size: 2em;
    margin-top: -1em;
    z-index: 10;
	}
  .feature-container p {
    font-family: 'Gotham', sans-serif;
    font-weight: 300;
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
    font-family: 'Gotham', sans-serif;
  }
</style>