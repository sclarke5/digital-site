<template>
  <nuxt-link
    :to="caseStudyLink"
    class="case-study-teaser block py-4 px-6 border rounded border-gray-400">
    <h2 class="pt-2 pb-4 text-2xl font-bold text-white">
      {{ caseStudyContent.name }}
    </h2>
    <p class="pb-6 leading-relaxed text-blue-200">
      {{ caseStudyContent.brief }}
    </p>
    <img :src="caseStudyContent.primary_image.filename" />
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