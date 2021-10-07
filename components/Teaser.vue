<template>
  <div
    v-editable="blok"
    class="mb-6 text-5xl font-bold text-center">
    <img 
      class="h-full w-full mb-4 object-cover"
      :src="blok.image.filename" />
    <div class="about-us-content flex-col justify-center mt-20 p-8 pt-32 pb-32">
    	<h3 class="text-5xl p-6 text-white">{{ blok.headline }}</h3>
			<p class="text-2xl text-gray-400">{{ blok.body }}</p>
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
    h3 {
        font-family: 'Gotham Black', sans-serif;
    }
		p {
        font-family: 'Gotham Black', sans-serif;
    }
    img {
        height: 90vh;
    }
</style>