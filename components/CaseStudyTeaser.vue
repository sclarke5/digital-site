<template>
  <nuxt-link
    :to="caseStudyLink"
    class="case-study-teaser block py-4 px-6 border rounded border-gray-400">
    <div class="case-study-container flex">
      <div class="case-study-left px-6">
          <h1 class="pt-2 pb-4 text-4xl font-bold text-white">
            {{ caseStudyContent.name }}
          </h1>
          <h2 class="pt-2 pb-4 text-2xl font-bold text-white">
            {{ caseStudyContent.client }}
          </h2>
          <p class="pb-6 leading-relaxed text-blue-200">
            {{ caseStudyContent.brief }}
          </p>
          <p class="pb-6 leading-relaxed text-white">
            The Challenge: <br />
            {{ caseStudyContent.challenge }}
          </p>
          <p class="pb-6 leading-relaxed text-white">The Approach: <br />
            {{ caseStudyContent.approach }}
          </p>
      </div>
      <div class="case-study-right">
        <img :src="caseStudyContent.primary_image.filename" />
        <p class="pb-6 leading-relaxed text-white">Price Range: {{ caseStudyContent.price_range }}</p>
        <p class="pb-6 leading-relaxed text-white">Results: {{ caseStudyContent.results }}</p>
      </div>
    </div>

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
    margin-top: -10em;
  }
  .case-study-left {
    width: 50%;
  }
</style>