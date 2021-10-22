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
          <img :src="visualsArray[0]" alt="">
          <div class="challenge-approach-second flex flex-col pt-8">
            <h4 class="text-white uppercase">Approach</h4>
            <p class="text-white">
              {{ caseStudyContent.approach }}
            </p>
          </div>
          <img :src="visualsArray[1]" alt="" class="mb-16 second-image">
          <img :src="visualsArray[2]" alt="" class="mb-16 third-image">

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
        <p class="testimonial">
        " 
        {{ caseStudyContent.testimonial }}
        "
        </p>
        <a class="cta text-white" :href="ctaURL" >Learn More</a>

        <!-- keep below for now to ensure that the modal is exapanded to a big enough size for debugging -->
            {{parsedCaseStudies}}

      
    </div>
    <div class="close absolute -right-8 -top-8" @click="$emit('close-modal')">
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
    visualsArray(){
      const visualsArr = [];
      this.caseStudyContent.visuals?.forEach((visual) => {
        if(visual.filename){
          visualsArr.push(visual.filename)
        }
      })
      return visualsArr
    },
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

p {
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

/* .third-image {

} */

.results-column {
  padding-top: 0;
}

.results-column p {
  font-weight: 300;
}

</style>