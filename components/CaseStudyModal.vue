<template>
  <div class="modal-overlay bg-black flex fixed inset-0">
    <div class="modal flex flex-col bg-black h-screen w-screen overflow-auto">
      <h3 class="pt-2 pl-6 text-white text-3xl text-left uppercase">
        {{ caseStudyContent.client }}
      </h3>
      <h1 class="pt-2 pl-6 text-white text-5xl text-left uppercase">
        {{ caseStudyContent.name }}
      </h1>
      <img class="check w-full" :src="caseStudyContent.primary_image.filename" alt="caseStudyContent.primary_image.filename" />
      <div class="body-container flex justify-evenly">
        <h3 class="text-white">DELIVERABLES</h3>
        <div class="challenege-approach-container w-1/2">
          <div class="challenge-approach-left flex flex-col">
            <h6 class="text-white uppercase">The Challenge: </h6>
            <p class="text-white">
              {{ caseStudyContent.challenge }}
            </p>
          </div>
          <div class="challenge-approach-right flex flex-col">
            <h6 class="text-white uppercase">The Approach: </h6>
            <p class="text-white">
              {{ caseStudyContent.approach }}
            </p>
            <p class="text-white testimonial">
              " 
              {{ caseStudyContent.testimonial }}
              "
            </p>
            <a class="cta text-white" :href="parsedCaseStudies.cta.url" >Learn More</a>
            <!-- keep below for now to ensure that the modal is exapanded to a big enough size for debugging -->
              {{parsedCaseStudies}}
          </div>
        </div>
      </div>
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
      const parsedData = JSON.parse(JSON.stringify(this.caseStudyContent))
      return parsedData;
    }
  }
}
</script>

<style scoped>


h1, h3, h6 {
  font-family: 'Gotham Black', sans-serif;
}

p {
  font-size: 16px;
  margin: 20px 0;
  font-family: 'Gotham', sans-serif;
  text-align: left;
}

</style>