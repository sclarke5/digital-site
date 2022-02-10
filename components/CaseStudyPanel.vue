<template>
  <div class="case-study-panel bg-black w-full">
    <div class="case-study-section">
      <h4 class="text-white uppercase">Challenge</h4>
      <p class="text-white pt-4">
        {{ caseStudyContent.challenge }}
      </p>
    </div>

    <div class="case-study-visual">
      <!-- <video
        v-if="visualsArray[0].filename.includes('webm') || visualsArray[0].filename.includes('mov')"
        controls
        :src="visualsArray[0].filename"
        class="pt-4"
      ></video>
      <img v-else :src="visualsArray[0].filename" alt="" class="pt-4" /> -->
      <img
        :src="caseStudyContent.primary_image_large.filename"
        :alt="caseStudyContent.primary_image_large.alt"
        class="second-image"
      />
    </div>

    <div class="case-study-section approach">
      <h4 class="text-white uppercase">Approach</h4>
      <rich-text-renderer v-if="caseStudyContent.approach" :document="caseStudyContent.approach" />

    </div>
     <div class="case-study-visual">
     <!-- <video
        v-if="visualsArray[1].filename.includes('webm') || visualsArray[0].filename.includes('mov')"
        controls
        :src="visualsArray[1].filename"
        class="pt-4"
      ></video>
      <img v-else :src="visualsArray[1].filename" alt="" class="pt-4" /> -->
      <img
        :src="caseStudyContent.primary_image_small.filename"
        :alt="caseStudyContent.primary_image_small.alt"
        class="third-image slider"
      />
    </div>

    <!-- <div class="case-study-visual mt-6">
      <video
        v-if="visualsArray[2].filename.includes('webm') || visualsArray[2].filename.includes('mov')"
        controls
        :src="visualsArray[2].filename"
        class="pt-4"
      ></video>
      <img :src="visualsArray[2].filename" alt="" class="pt-4" />
    </div> -->

    <div class="results-container bg-white w-full">
      <div class="case-study-section">
        <h4 class="text-black uppercase">Results</h4>
        <p class="text-black pt-4">
          {{ caseStudyContent.result_1 }}
        </p>
        <p v-if="caseStudyContent.result_2" class="text-black pt-4">
          {{ caseStudyContent.result_2 }}
        </p>
        <p v-if="caseStudyContent.result_3" class="text-black pt-4">
          {{ caseStudyContent.result_3 }}
        </p>
      </div>
    </div>

    <div v-if="caseStudyContent.testimonial" class="case-study-section">
      <div
        v-if="caseStudyContent.testimonial"
        class="flex flex-col bg-black py-12"
      >
        <p class="testimonial text-white">
          "{{ caseStudyContent.testimonial }}"
        </p>
        <p class="testimonial-author text-white pt-4">
          {{ caseStudyContent.testimonial_author }}
        </p>
      </div>
    </div>
    <div 
      v-if="caseStudyContent.visual.filename.includes('webm') || caseStudyContent.visual.filename.includes('mp4') || caseStudyContent.visual.filename.includes('mov') || caseStudyContent.visual.filename.includes('mpeg')"
      class="video-container relative">
      <video
        :poster="hasThumbnail"
        class="video"
        controls
        :src="caseStudyContent.visual.filename"
        :alt="caseStudyContent.visual.alt"
      ></video>
      <!-- <svg
        version="1.1"
        class="video-icon" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        x="0px" 
        y="0px"
        viewBox="0 0 210 210" 
        style="fill:white" 
        xml:space="preserve"
        @click="playVideo"
        >
        <path class="play-icon" d="M179.07,105L30.93,210V0L179.07,105z"/>
      </svg> -->
    </div>
    <img
        v-else
        class="my-20"
        :src="caseStudyContent.visual.filename"
        :alt="caseStudyContent.visual.alt"
      />
    <div class="services-container text-center mt-8 flex flex-col justify-center items-center">
      <h4 class="text-white">DISCIPLINES PROVIDED</h4>
      <ul class="pt-4">
        <li v-for="(discipline, index) in caseStudyContent.disciplines"
          :key="index"
          class="text-white"
        >
          {{ discipline }}
        </li>
      </ul>
      <hr class="my-4 w-2/3">
      <h4 class="text-white">SERVICES PROVIDED</h4>
      <ul class="pt-4">
        <li v-for="(service, index) in caseStudyContent.services_provided"
          :key="index"
          class="text-white"
        >
          {{ service }}
        </li>
      </ul>
    </div>
    <div class="scroll-for-more flex p-8 justify-center items-center">
      <h4 class="text-white">Scroll for more</h4>
      <svg
        class="ml-8"
        width="10"
        height="30"
        viewBox="0 0 16 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="styled-arrow"
          d="M15 29L1 15L15 1"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
              
    </div>
    <!-- <hr class="mt-16 mx-6" /> -->
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
    hasThumbnail(){
      if(this.caseStudyContent.video_thumbnail){
        return this.caseStudyContent.video_thumbnail.filename
      } else {
        return ''
      }
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
  max-height: 50vh;
  width: 100%;
  object-fit: cover;
  margin: 0;
  padding: 0;
}

.approach p {
  color: white;
  padding-top: 1em;
}

.testimonial {
  font-size: 2em;
  line-height: 1.4;
  font-family: 'Adobe Caslon Pro', sans-serif;
  font-style: italic;
}

.scroll-for-more h4 {
  font-size: 1.5em;
  font-family: 'Gotham', sans-serif;
}

.scroll-for-more svg {
  transform: rotate(-90deg);
}

hr {
  color: white;
}
</style>
