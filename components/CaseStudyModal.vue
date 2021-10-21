<template>
  <div class="modal-overlay bg-black flex fixed inset-0">
    <div class="modal flex flex-col bg-black p-24 h-screen w-screen overflow-auto">
      <h3 class="pt-2 pl-6 text-white text-3xl text-left uppercase">
        {{ this.caseStudyContent.client }}
      </h3>
      <h1 class="pt-2 pl-6 text-white text-5xl text-left uppercase">
        {{ this.caseStudyContent.name }}
      </h1>
      <img class="check w-full" :src="caseStudyContent.primary_image.filename" alt="caseStudyContent.primary_image.filename" />
      <div class="body-container flex justify-evenly">
        <h3 class="text-white">DELIVERABLES</h3>
        <div class="challenege-approach-container w-1/2">
          <div class="challenge-approach-left flex flex-col">
            <h6 class="text-white uppercase">The Challenge: </h6>
            <p class="text-white">
              {{ this.caseStudyContent.challenge }}
            </p>
          </div>
          <div class="challenge-approach-right flex flex-col">
            <h6 class="text-white uppercase">The Approach: </h6>
            <p class="text-white">
              {{ this.caseStudyContent.approach }}
            </p>
            <!-- <img :src="caseStudyContent.visuals" alt=""> -->
            <p class="text-white">{{ this.caseStudyContent.visuals }}</p>
            <p class="text-white">{{typeof(this.caseStudyContent.visuals)}}</p>
          </div>
        </div>
      </div>

      {{ this.caseStudyContent.name }}
      {{ this.caseStudyContent.client }}

      {{ this.caseStudyContent }}
      {{ this.caseStudyContent }}

    </div>
    <div class="close mt-20 mr-8" @click="$emit('close-modal')">
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