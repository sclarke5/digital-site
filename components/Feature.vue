<template>
  <div
    v-editable="blok"
    class="py-2 text-center flex-column">
		
    <h1 class="text-lg">{{ blok.name }}</h1>
		<img 
			class="mx-auto"
			:src="blok.icon.filename"
			/>
			<p class="text-gray-400"> {{ blok.description }}</p>
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
		font-family: 'Gotham Black', sans-serif;
	}
</style>