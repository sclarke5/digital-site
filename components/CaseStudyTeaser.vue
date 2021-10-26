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
        <div class="view-case-study flex items-center" @click="showModal = true">
          <span>VIEW CASE STUDY</span>
          <img src="~/assets/arrow-right.png" />
        </div>
        <case-study-modal v-show="showModal" :case-study-content="caseStudyContent" :case-studies-list="caseStudiesList" @close-modal="showModal = false" />
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
    },
    caseStudiesList: {
      type: Array,
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
  width: 60%;
  transform: rotate(90deg);
  margin-bottom: 200vh;
  margin-top: -10em;
  margin-left: 25em;
}

.case-study-left {
  width: 50%;
}

.case-study-right {
  width: 50%;
  scroll-snap-align: center;
}

.view-case-study {
  /* background-color: #4FC8ED; */
  width: fit-content;
  height: 40px;
  color: white;
  font-size: 14px;
  margin-top: 50px;
  cursor: pointer;
  border: 2px solid white;
  justify-content: space-around;
  transition: background-color 0.5s ease, color 0.5s ease;
  padding: 1.5em;
}

.view-case-study span {
  font-family: 'Gotham', sans-serif;
  font-weight: 700;
}

.view-case-study img {
  margin-left: 1em;
}

.view-case-study:hover {
  color: black;
  background-color: white;
}

</style>