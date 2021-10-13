<template>
  <nuxt-link
    :to="caseStudyLink"
    class="case-study-teaser block py-4 px-6 border rounded border-gray-400 my-12">
    <h2 class="pt-2 pb-4 text-2xl font-bold text-white">
      {{ caseStudyContent.name }}
    </h2>
    <p class="pb-6 leading-relaxed text-blue-200">
      {{ caseStudyContent.brief }}
    </p>
    <img class="w-1/2" :src="caseStudyContent.primary_image.filename" />
  </nuxt-link>
</template>
 
<script>
export default {
  props: {
    caseStudyContent: {
      type: Object,
      required: true
    },
    caseStudyLink: {
      type: String,
      required: true
    }
  }, 
}
</script>

<style scoped>
  .case-study-teaser {
    transform: rotate(90deg);
    margin-bottom: 200vh;
    margin-top: -20em;
  }
</style>