<template>
  <div class="modal-overlay bg-black flex fixed inset-0">
    <div class="modal flex flex-col bg-black h-screen w-screen overflow-auto">
      <div class="title-container flex flex-col p-9">
        <h1 class="pt-2 pl-6 text-white text-5xl text-left uppercase">
          {{ caseStudyContent.name }}
        </h1>
        <h3 class="pt-2 pl-6 text-white text-3xl text-left uppercase">
          {{ caseStudyContent.client }}
        </h3>
        <h5 class="pt-2 pl-6 text-white text-xl text-left uppercase">
          {{ caseStudyContent.tagline }}
        </h5>
      </div>
      
      <img class="check w-full" :src="caseStudyContent.primary_image.filename" alt="caseStudyContent.primary_image.filename" />

      <div class="body-container flex justify-evenly pt-12">
        <div class="services-container flex flex-col">
          <h4 class="text-white">SERVICES PROVIDED</h4>
          <ul>
            <li v-for="(service, index) in parsedCaseStudies.services_provided" :key=index class="text-white">
              {{service}}
            </li>
          </ul>
        </div>
        <div class="challenege-approach-container w-1/2">
          <div class="challenge-approach-first flex flex-col">
            <h4 class="text-white uppercase">Challenge</h4>
            <p class="text-white">
              {{ caseStudyContent.challenge }}
            </p>
          </div>

          <!-- whenever we render a visual, check whether the filetype includes video extentions. TODO: add other formats in addition to webm -->
          <video v-if="visualsArray[0].filename.includes('webm')" controls :src="visualsArray[0].filename"></video>
          <img v-else :src="visualsArray[0].filename" alt="">

          <div class="challenge-approach-second flex flex-col pt-8">
            <h4 class="text-white uppercase">Approach</h4>
            <p class="text-white">
              {{ caseStudyContent.approach }}
            </p>
          </div>

          <video v-if="visualsArray[1].filename.includes('webm')" controls :src="visualsArray[1].filename"></video>
          <img v-else :src="visualsArray[1].filename" alt="" class="mb-16 second-image">

          <video v-if="visualsArray[2].filename.includes('webm')" controls :src="visualsArray[2].filename"></video>
          <img :src="visualsArray[2].filename" alt="" class="mb-16 third-image">

        </div>
      </div>
      <div class="results-container bg-white">
        <h4 class="uppercase pt-8 pl-12">Results</h4>
        <div class="results-columns flex">
          <div class="results-column first-column w-1/3 p-12">
            <p>
              {{ caseStudyContent.result_1 }}
            </p>
          </div>
          <div class="results-column second-column w-1/3 p-12">
            <p>
              {{ caseStudyContent.result_2 }}
            </p>
          </div>
          <div class="results-column third-colum w-1/3 p-12">
            <p>
              {{ caseStudyContent.result_3 }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-end">
        <div class="flex flex-col p-12 w-2/3">
          <p class="testimonial text-white">
          "{{ caseStudyContent.testimonial }}"
          </p>
          <p class="testimonial-author text-white mt-4 mb-8">
            {{ caseStudyContent.testimonial_author }}
          </p>
          <div class="flex cta items-center justify-around">
            <a :href="ctaURL" target="_blank" class="flex">
              <span class="uppercase" :href="ctaURL" >Go to Site</span>
              <img src="~/assets/arrow-right.png" />
            </a>
          </div>
        </div>
      </div>

      <div class="more-work mt-8 mb-80">
        <h1 class="pt-2 pl-6 text-white text-5xl text-left uppercase">See more work</h1>
        <ul class="flex py-6 mb-6 case-list">
          <li v-for="caseStudy in seeMoreWork" 
            :key="caseStudy._uid"
            class="flex-auto px-6 w-1/3">
            <img :src="caseStudy.content.primary_image.filename" alt="">
            <h1 class="mt-2 text-2xl text-white uppercase">{{ caseStudy.name }}</h1>
            <h5 class="mt-2 text-white uppercase">{{caseStudy.content.client}}</h5>
            <div class="mt-4 flex cta items-center justify-around case-study-link" @click="scrollToCaseStudy" >
              <div class="flex">
                <span  v-bind:id="caseStudy.content._uid" class="uppercase">View Case Study</span>
                <img src="~/assets/arrow-right.png" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="close" @click="$emit('close-modal')">
      <img class="close-img cursor-pointer w-16" src="~/assets/x-mark-64.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    caseStudyContent: {
      type: Object,
      required: true
    },
    caseStudiesList: {
      type: Array,
      required: true
    }
  },
  computed: {
    parsedCaseStudies() {
      return JSON.parse(JSON.stringify(this.caseStudyContent))
    },
    ctaURL() {
      return this.caseStudyContent.cta?.url
    },
    servicesProvided() {
      return this.caseStudyContent.services_provided
    },
    visualsArray() {
      const visualsArr = [];
      this.caseStudyContent.visuals?.forEach((visual) => {
        if(visual.filename){
          visualsArr.push(visual)
        }
      })
      return visualsArr
    },
    seeMoreWork() {
      const otherCaseStudies = []
      this.caseStudiesList.forEach((caseStudy) => {
        if(caseStudy.content._uid !== this.caseStudyContent._uid){
          otherCaseStudies.push(caseStudy)
        }
      })
      // below temporary to keep it simple; TODO: figure out how many/which "other case studies" to display
      const selectedCaseStudies = otherCaseStudies.slice(0, 3)
      return selectedCaseStudies
    },
  },
  methods: {
    scrollToCaseStudy(e) {
      const idString = e.target.id
      const destination = document.getElementsByClassName(`${idString}`)
      destination[0].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'center'
      })
    }
  }
}
</script>

<style scoped>


h1, h3, h5, h6 {
  font-family: 'Gotham', sans-serif;
}

h1, h3 {
  font-weight: 800;
}

h5 {
  font-weight: 200;
}

h4 {
  font-family: 'DinPro-Black', sans-serif;
}

.body-container p {
  font-size: 16px;
  margin: 20px 0;
  font-family: 'Gotham', sans-serif;
  text-align: left;
  font-weight: 200;
}

.services-container ul {
  margin: 20px 0;
}

.services-container li {
  font-family: 'Gotham', sans-serif;
  font-weight: 200;
}

.third-image {
  margin-left: -20em;
  margin-top: -10em;
}

.results-column {
  padding-top: 0;
}

.results-column p {
  font-weight: 300;
}

.testimonial {
  font-size: 2em;
  line-height: 2;
  font-family: 'Adobe Caslon Pro', sans-serif;
  font-style: italic;
}

.testimonial-author {
  font-family: 'Gotham', sans-serif;
}

.cta {
  border: 2px solid white;
  color: white;
  transition: background-color 0.5s ease, color 0.5s ease;
  height: 40px;
  width: fit-content;
  padding: 1.5em;
  cursor: pointer;
}

.cta span {
  font-family: 'Gotham', sans-serif;
  font-weight: 700;
}

.cta img {
  margin-left: 1em;
}

.cta:hover {
  color: black;
  background-color: white;
}

@media screen and (min-width: 800px) {
  .modal {
    position: absolute;
    width: 120%;
  }
}



</style>