<template>
  <div
    v-editable="blok"
    class="prose my-24 mx-auto">
    <h1>{{ blok.name }}</h1>
    <h4>{{ blok.brief }}</h4>
    <rich-text-renderer :document="blok.body" }} />
    <img :src="blok.primary_image.filename" />
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
