<template>
  <div class="case-study-panel bg-black w-full">
    <div class="case-study-section">
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
    </div>

    <div class="case-study-section">
      <video
        v-if="visualsArray[0].filename.includes('webm') || visualsArray[0].filename.includes('mov')"
        controls
        :src="visualsArray[0].filename"
        class="pt-4"
      ></video>
      <img v-else :src="visualsArray[0].filename" alt="" class="pt-4" />
    </div>

    <div class="case-study-section">
      <h4 class="text-white uppercase pt-4">Approach</h4>
      <p class="text-white pt-4">
        {{ caseStudyContent.approach }}
      </p>
      <div class="case-study-section"></div>
      <video
        v-if="visualsArray[1].filename.includes('webm') || visualsArray[0].filename.includes('mov')"
        controls
        :src="visualsArray[1].filename"
        class="pt-4"
      ></video>
      <img v-else :src="visualsArray[1].filename" alt="" class="pt-4" />
    </div>

    <div class="case-study-section">
      <video
        v-if="visualsArray[2].filename.includes('webm') || visualsArray[2].filename.includes('mov')"
        controls
        :src="visualsArray[2].filename"
        class="pt-4"
      ></video>
      <img :src="visualsArray[2].filename" alt="" class="pt-4" />
    </div>

    <div class="results-container bg-white w-full my-12">
      <div class="case-study-section">
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
    </div>

    <div class="case-study-section">
      <div
        v-if="caseStudyContent.testimonial"
        class="flex flex-col bg-black pt-12"
      >
        <p class="testimonial text-white">
          "{{ caseStudyContent.testimonial }}"
        </p>
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
    </div>

    <hr class="mt-16 mx-6" />
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
.case-study-section {
  max-width: 620px;
  width: 100%;
  margin: 0 auto;
  @apply p-6;
}

img {
  max-height: 60vh;
  max-width: 60vh;
  width: 100%;
  object-fit: cover;
  margin: 1rem auto;
  padding: 0;
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
