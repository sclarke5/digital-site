<template>
  <nuxt-link
    :to="articleLink"
    class="articles-teaser block py-4 px-6 border rounded border-gray-400">
    <h2 class="pt-2 pb-4 text-2xl font-bold text-white">
      {{ articleContent.name }}
    </h2>
    <p class="pb-6 leading-relaxed text-gray-400">
      {{ articleContent.intro }}
    </p>
  </nuxt-link>
</template>
 
<script>
export default {
  props: {
    articleContent: {
      type: Object,
      required: true
    },
    articleLink: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .articles-teaser {
    transform: rotate(90deg);
    margin-bottom: 100vh;
  }
</style>