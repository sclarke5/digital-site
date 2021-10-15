<template>
  <div class="modal-overlay">
    <div class="modal flex flex-col">
      <h3 class="pt-2 pl-6 text-white text-3xl">
        {{ this.caseStudyContent.client }}
      </h3>
      <h1 class="pt-2 pl-6 text-white text-5xl">
        {{ this.caseStudyContent.name }}
      </h1>
      <img class="check w-full" :src="caseStudyContent.primary_image.filename" alt="caseStudyContent.primary_image.filename" />
      <div class="body-container flex justify-evenly">
        <h3 class="text-white">DELIVERABLES</h3>
        <div class="challenege-approach-container w-1/2">
          <div class="challenge-approach-left flex flex-col">
            <h6 class="text-white">The Challenge: </h6>
            <p class="text-white">
              {{ this.caseStudyContent.challenge }}
            </p>
          </div>
          <div class="challenge-approach-right flex flex-col">
            <h6 class="text-white">The Approach: </h6>
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
    <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="~/assets/x-mark-64.png" alt="">
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

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  display: flex;
  text-align: center;
  background-color: black;
  height: 1000px;
  width: 1000px;
  padding: 60px 0;
  border-radius: 20px;
  overflow: auto;
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 50px;
  margin-top: -8em;
}

h1, h3, h6 {
  font-family: 'Gotham Black', sans-serif;
  text-align: left;
  text-transform: uppercase;
}


p {
  font-size: 16px;
  margin: 20px 0;
  font-family: 'Gotham', sans-serif;
  text-align: left;
}

button {
  background-color: #ac003e;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
</style>