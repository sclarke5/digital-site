<template>
  <div
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
      </div>
      <div class="case-study-right">
        <img :src="caseStudyContent.primary_image.filename" />
        <button @click="showModal = true">LEARN MORE</button>
        <case-study-modal v-show="showModal" :case-study-content="caseStudyContent" @close-modal="showModal = false" />
      </div>
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
    caseStudyLink: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showModal: false
    }
  },
}
</script>

<style scoped>
.case-study-teaser {
  width: 90%;
  transform: rotate(90deg);
  margin-bottom: 200vh;
  margin-top: -10em;
}
.case-study-left {
  width: 50%;
}

.case-study-right {
  width: 50%;
}

button {
  background-color: #727D4F;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
</style>