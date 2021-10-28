<template>
  <div
    v-editable="blok"
    class="py-2 flex flex-col feature-container">
    <img 
      class="mx-auto"
      :src="blok.icon.filename" />
    <h1 class="mt-8 text-lg text-left uppercase">{{ blok.name }}</h1>
    <p class="mt-8 text-white text-left"> {{ blok.description }}</p>
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
	}
  .feature-container p {
    font-family: 'Gotham', sans-serif;
    font-weight: 300;
  }
</style>