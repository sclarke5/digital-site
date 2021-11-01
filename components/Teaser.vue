<template>
  <div
    v-editable="blok"
    class="mb-6 text-5xl font-bold text-center teaser-container w-2/3">
    <div class="about-us-content flex-col justify-center pt-32 pb-32">
    	<h1 class="text-5xl p-6 text-white">{{ blok.headline }}</h1>
			<p class="text-2xl text-gray-400">{{ blok.body_1 }}</p>
    </div>
    <div>
      <p class="text-2xl text-gray-400">{{ blok.body_2 }}</p>
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
        text-transform: uppercase;
        font-weight: 800;
    }
		p {
        font-family: 'Gotham', sans-serif;
    }
    img {
        height: 90vh;
    }
    .teaser-container {
      transform: rotate(90deg);
      margin-bottom: 200vh;
      margin-top: 30em;
      margin-left: 7em;
      
      /* height: 100vw; */
    }
</style>