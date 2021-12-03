<template>
  <div class="case-study-panel bg-black">
    <h4 class="text-white pt-4">SERVICES PROVIDED</h4>
    <ul class="pt-4">
      <li
        v-for="(service, index) in parsedCaseStudies.services_provided"
        :key="index"
        class="text-white"
      >
        {{ service }}
      </li>
    </ul>
    <h4 class="text-white uppercase pt-4">Challenge</h4>
    <p class="text-white pt-4">
      {{ caseStudyContent.challenge }}
    </p>

    <video
      v-if="visualsArray[0].filename.includes('webm')"
      controls
      :src="visualsArray[0].filename"
      class="pt-4"
    ></video>
    <img v-else :src="visualsArray[0].filename" alt="" class="pt-4" />

    <h4 class="text-white uppercase pt-4">Approach</h4>
    <p class="text-white pt-4">
      {{ caseStudyContent.approach }}
    </p>

    <video
      v-if="visualsArray[1].filename.includes('webm')"
      controls
      :src="visualsArray[1].filename"
      class="pt-4"
    ></video>
    <img v-else :src="visualsArray[1].filename" alt="" class="pt-4" />

    <video
      v-if="visualsArray[2].filename.includes('webm')"
      controls
      :src="visualsArray[2].filename"
      class="pt-4"
    ></video>
    <img :src="visualsArray[2].filename" alt="" class="pt-4" />
    <div class="results-container bg-white py-4 -mx-6 px-6">
      <h4 class="text-black uppercase">Results</h4>
      <p class="text-black pt-4">
        {{ caseStudyContent.result_1 }}
      </p>
      <p class="text-black pt-4">
        {{ caseStudyContent.result_2 }}
      </p>
      <p class="text-black pt-4">
        {{ caseStudyContent.result_2 }}
      </p>
    </div>
    <div v-if="caseStudyContent.testimonial" class="flex flex-col bg-black pt-12">
      <p class="testimonial text-white">"{{ caseStudyContent.testimonial }}"</p>
      <p class="testimonial-author text-white pt-4">
        {{ caseStudyContent.testimonial_author }}
      </p>
      <!-- <div class="flex cta items-center justify-around">
        <a :href="ctaURL" target="_blank" class="flex">
          <span class="uppercase" :href="ctaURL" >Go to Site</span>
          <img src="~/assets/arrow-right.png" />
        </a>
      </div> -->
    </div>
    <hr class="mt-16" />
  </div>
</template>

<script>
export default {
  props: {
    caseStudyContent: {
      type: Object,
      required: true,
    },
  },
  computed: {
    parsedCaseStudies() {
      return JSON.parse(JSON.stringify(this.caseStudyContent))
    },
    visualsArray() {
      const visualsArr = []
      this.caseStudyContent.visuals?.forEach((visual) => {
        if (visual.filename) {
          visualsArr.push(visual)
        }
      })
      return visualsArr
    },
  },
}
</script>

<style scoped>
img {
  width: 100%;
}

.testimonial {
  font-size: 2em;
  line-height: 1.4;
  font-family: 'Adobe Caslon Pro', sans-serif;
  font-style: italic;
}

hr {
  color: white;
}
</style>
